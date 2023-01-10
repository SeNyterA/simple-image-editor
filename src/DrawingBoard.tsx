import {
  Canvas,
  DashPathEffect,
  DiscretePathEffect,
  Group,
  Image,
  Path,
  rect,
  rrect,
  SkRect,
  useImage
} from '@shopify/react-native-skia'
import React, { useMemo, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { DrawingElement } from './contexts/type'
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

export default function DrawingBoard() {
  const [canvasSize, setCanvasSize] = useState({
    width: width,
    height: height - 50
  })
  const elements = useWatchDrawing(s => s.elements)
  const touchHandler = useTouchDrawing()
  const image = useImage(
    'https://cdn.discordapp.com/attachments/824562218414243851/1061832691596677201/IMG_2512.jpg'
  )

  const elementComponents = useMemo(() => {
    return elements.map((element: DrawingElement, index) => {
      switch (element.type) {
        case 'path':
          switch (element.pathType) {
            case 'discreted':
              return (
                <Group key={index}>
                  <Path
                    path={element.path}
                    color={element.color}
                    style='stroke'
                    strokeWidth={element.size}
                    strokeCap='round'
                  >
                    <DiscretePathEffect length={3} deviation={5} />
                  </Path>
                </Group>
              )
            case 'dashed':
              return (
                <Group key={index}>
                  <Path
                    path={element.path}
                    color={element.color}
                    style='stroke'
                    strokeWidth={element.size}
                    strokeCap='round'
                  >
                    <DashPathEffect
                      intervals={[element.size * 2, element.size * 2]}
                    />
                  </Path>
                </Group>
              )
            default:
              return (
                <Path
                  key={index}
                  path={element.path}
                  color={element.color}
                  style='stroke'
                  strokeWidth={element.size}
                  strokeCap='round'
                />
              )
          }

        default:
      }
    })
  }, [elements])

  const imgRect = getRectImage({
    canvasH: canvasSize.height,
    canvasW: canvasSize.width,
    imgH: image?.height(),
    imgW: image?.width()
  })
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onLayout={event => {
        var { x, y, width, height } = event.nativeEvent.layout
        setCanvasSize({
          width,
          height
        })
      }}
    >
      {!!imgRect && (
        <Canvas
          onTouch={touchHandler}
          style={{
            ...imgRect
          }}
        >
          <Group
            clip={rrect(rect(0, 0, imgRect.width, imgRect.height), 10, 10)}
          >
            {!!image && <Image image={image} fit='contain' {...imgRect} />}
            {elementComponents}
          </Group>
        </Canvas>
      )}
    </View>
  )
}
