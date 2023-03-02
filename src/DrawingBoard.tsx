import {
  Canvas,
  Group,
  Image,
  SkiaDomView,
  SkImage,
  SkRect,
  useImage
} from '@shopify/react-native-skia'
import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { PhotoFile } from 'react-native-vision-camera'
import { CircleItem } from './components/CircleItem'
import PathItem from './components/PathItem'
import { RectItem } from './components/RectItem'
import TextItem from './components/TextItem'
import { useDrawContext } from './contexts/DrawProvider'
import GestureHandler from './GestureHandler'
import { useTouchDrawing } from './hooks/useTouchDrawing'
import useWatchDrawing from './hooks/useWatchDrawing'
const { width, height } = Dimensions.get('window')

type Image = PhotoFile & {
  image: SkImage | null
}

const getRectImage = ({
  imgW,
  imgH,
  canvasW,
  canvasH
}: {
  imgW?: number
  imgH?: number
  canvasW?: number
  canvasH?: number
}) => {
  let rect: SkRect | undefined = undefined
  if (imgW && imgH && canvasW && canvasH) {
    if (imgW / canvasW > imgH / canvasH) {
      rect = {
        width: canvasW,
        height: canvasW * (imgH / imgW),
        x: 0,
        y: 0
      }
    } else {
      rect = {
        width: canvasH * (imgW / imgH),
        height: canvasH,
        x: 0,
        y: 0
      }
    }
  }
  return rect
}

export default function DrawingBoard({
  innerRef,
  baseURL
}: {
  innerRef: React.RefObject<SkiaDomView>
  baseURL: string
}) {
  const [canvasSize, setCanvasSize] = useState({
    width: width,
    height: height - 50
  })
  const context = useDrawContext()
  const touchHandler = useTouchDrawing()
  const compactElements = useWatchDrawing(s => s.elements)
  const image = useImage(`file://${baseURL}`)
  const imgRect = getRectImage({
    canvasH: canvasSize.height,
    canvasW: canvasSize.width,
    imgH: image?.height(),
    imgW: image?.width()
  })

  return (
    <>
      <View
        style={{
          flex: 1,
          borderRadius: 20,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff3'
        }}
        onLayout={event => {
          var { width, height } = event.nativeEvent.layout
          setCanvasSize({
            width,
            height
          })
        }}
      >
        <View>
          {!!imgRect && (
            <Canvas
              onTouch={touchHandler}
              style={{
                ...imgRect
              }}
              ref={innerRef}
              onLayout={event => {
                var { width, height } = event.nativeEvent.layout
                context.commands.setState({
                  canvasSize: {
                    width,
                    height
                  }
                })
              }}
            >
              <Group
              // clip={rrect(rect(0, 0, imgRect.width, imgRect.height), 10, 10)}
              >
                {!!image && <Image image={image} fit='contain' {...imgRect} />}
                {compactElements.map((e, index) => {
                  switch (e.type) {
                    case 'path':
                      return <PathItem element={e} key={index} />
                    case 'text':
                      return <TextItem textElement={e} key={index} />
                    case 'circle':
                      return <CircleItem element={e} key={index} />
                    case 'rect':
                      return <RectItem element={e} key={index} />
                  }
                })}
              </Group>
            </Canvas>
          )}

          {compactElements.map((e, index) => (
            <GestureHandler
              key={index}
              index={index}
              debug={e.selected}
              dimensions={e.dimensions}
            />
          ))}
        </View>
      </View>
      <View style={{ height: 50, padding: 10 }} />
    </>
  )
}
