import {
  Canvas,
  Group,
  Image,
  ImageFormat,
  SkiaDomView,
  SkRect,
  useImage
} from '@shopify/react-native-skia'
import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import Share from 'react-native-share'
import PathItem from './components/PathItem'
import Test from './components/Test'
import TextItem from './components/TextItem'
import { useDrawContext } from './contexts/DrawProvider'
import GestureHandler from './GestureHandler'

import { useTouchDrawing } from './hooks/useTouchDrawing'
import useWatchDrawing from './hooks/useWatchDrawing'

const { width, height } = Dimensions.get('window')

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
  innerRef
}: {
  innerRef: React.RefObject<SkiaDomView>
}) {
  const [canvasSize, setCanvasSize] = useState({
    width: width,
    height: height - 50
  })

  const touchHandler = useTouchDrawing()
  const image = useImage(
    'https://cdn.discordapp.com/attachments/824562218414243851/1061832691596677201/IMG_2512.jpg'
  )
  const context = useDrawContext()

  const compactElements = useWatchDrawing(s => s.elements)

  const imgRect = getRectImage({
    canvasH: canvasSize.height,
    canvasW: canvasSize.width,
    imgH: image?.height(),
    imgW: image?.width()
  })

  const share = async () => {
    const image = innerRef.current?.makeImageSnapshot()
    if (image) {
      const data = image.encodeToBase64(ImageFormat.PNG, 100)
      const url = `data:image/png;base64,${data}`
      const shareOptions = {
        title: 'Sharing image from awesome drawing app',
        message: 'My drawing',
        url,
        failOnCancel: false
      }
      await Share.open(shareOptions)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onLayout={event => {
        var { width, height } = event.nativeEvent.layout
        setCanvasSize({
          width,
          height
        })
      }}
    >
      <View style={{ overflow: 'hidden', borderRadius: 10 }}>
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
                  default:
                    return <></>
                }
              })}
              <Test />
            </Group>
          </Canvas>
        )}

        {compactElements.map((e, index) => {
          switch (e.type) {
            case 'text':
              return <GestureHandler key={index} index={index} />
          }
        })}
      </View>
      <Test />
    </View>
  )
}
