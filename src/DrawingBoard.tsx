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
import ArrowItem from './components/ArrowItem'

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

const getRectImageFull = ({
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

  if (imgW && imgH && canvasW && canvasH) {
    rect = {
      width: canvasW,
      height: canvasH,
      x: 0,
      y: 0
    }
  }

  // if (imgW && imgH && canvasW && canvasH)
  //   rect = {
  //     x: 0,
  //     y: 0,
  //     width: imgW > canvasW ? imgW : canvasW,
  //     height: imgH > canvasH ? imgH : canvasH
  //   }

  return rect
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
  tmpURL
}: {
  innerRef: React.RefObject<SkiaDomView>
  tmpURL?: string
}) {
  const [canvasSize, setCanvasSize] = useState({
    width: width,
    height: height - 50
  })
  const {
    commands: { setState }
  } = useDrawContext()
  const touchHandler = useTouchDrawing()
  const compactElements = useWatchDrawing(s => s.elements)
  const menu = useWatchDrawing(s => s.action)
  // const image = useImage(`file://${tmpURL}`)

  // const image = useImage(
  //   'https://cdn.discordapp.com/attachments/824562218414243851/1082716690871222282/IMG_3647.png'
  // )

  const image = useImage(tmpURL)

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
                setState({
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
                {!!image && <Image image={image} fit='cover' {...imgRect} />}
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
                    case 'arrow':
                      return <ArrowItem element={e} key={index} />
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
              menu={menu}
              itemType={e.type}
            />
          ))}
        </View>
      </View>
      <View style={{ height: 50, padding: 10 }} />
    </>
  )
}
