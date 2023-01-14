import {
  Canvas,
  DashPathEffect,
  DiscretePathEffect,
  Group,
  Image,
  Path,
  rect,
  rrect,
  SkiaDomView,
  SkiaMutableValue,
  SkRect,
  useImage,
  useValue
} from '@shopify/react-native-skia'
import {
  Skia,
  SkMatrix
} from '@shopify/react-native-skia/lib/typescript/src/skia/types'
import React, { useMemo, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { ToolbarMode, useDrawContext } from './contexts/DrawProvider'
import { DrawingElement } from './contexts/type'
import { GestureHandler } from './GestureHandler'
import { useTouchDrawing } from './hooks/useTouchDrawing'
import useWatchDrawing from './hooks/useWatchDrawing'
import { LocationSticker } from './LocationSticker'

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
  const elements = useWatchDrawing(s => s.elements) as DrawingElement[]
  const textElements = useWatchDrawing(s => s.textElements) as DrawingElement[]
  const mode = useWatchDrawing(s => s.mode) as ToolbarMode
  console.log(mode)

  const elementComponents = useMemo(
    () =>
      elements.map((element: DrawingElement, index) => {
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
      }),

    [elements]
  )

  const elementTextComponents = useMemo(
    () =>
      textElements.map((e: DrawingElement, index) => {
        switch (e.type) {
          case 'text':
            return (
              <LocationSticker
                key={index}
                text={e.text}
                font={e.font}
                matrix={e.matrix}
                rectDimensions={e.dimensions}
                index={index}
                context={context}
              />
            )

          default:
        }
      }),

    [textElements]
  )

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
      <View>
        {!!imgRect && (
          <Canvas
            onTouch={touchHandler}
            style={{
              ...imgRect
            }}
            ref={innerRef}
          >
            <Group
              clip={rrect(rect(0, 0, imgRect.width, imgRect.height), 10, 10)}
            >
              {!!image && <Image image={image} fit='contain' {...imgRect} />}
              {elementComponents}
              {mode === 'export' && elementTextComponents}
              {/* {mode === 'export' &&
                textElements.map(
                  (e, index) =>
                    e.type === 'text' && (
                      <LocationSticker
                        key={index}
                        text={e.text}
                        font={e.font}
                        matrix={e.matrix}
                        rectDimensions={e.dimensions}
                      />
                    )
                )} */}
            </Group>
          </Canvas>
        )}

        {textElements.map(
          (e, index) =>
            e.type === 'text' && (
              <GestureHandler
                key={index}
                dimensions={e.dimensions}
                matrix={e.matrix}
                debug={true}
                text={e.text}
                index={index}
              />
            )
        )}
      </View>
    </View>
  )
}
