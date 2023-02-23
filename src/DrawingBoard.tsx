import {
  Canvas,
  DashPathEffect,
  DiscretePathEffect,
  Group,
  Image,
  ImageFormat,
  Path,
  SkiaDomView,
  SkRect,
  useImage
} from '@shopify/react-native-skia'
import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions, View } from 'react-native'
import Share from 'react-native-share'
import { ToolbarMode, useDrawContext } from './contexts/DrawProvider'
import { DrawingElement, TextElement } from './contexts/type'
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

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
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
  const [preExport, setPreExport] = useState(false)
  const touchHandler = useTouchDrawing()
  const image = useImage(
    'https://cdn.discordapp.com/attachments/824562218414243851/1061832691596677201/IMG_2512.jpg'
  )
  const context = useDrawContext()
  const elements = useWatchDrawing(s => s.elements)
  const textElements = useWatchDrawing(s => s.textElements)
  const mode = useWatchDrawing(s => s.mode)

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
      textElements.map((e: DrawingElement, index) => (
        <LocationSticker
          key={index}
          index={index}
          textElement={context.state.textElements[index]}
        />
      )),
    [textElements]
  )

  const imgRect = getRectImage({
    canvasH: canvasSize.height,
    canvasW: canvasSize.width,
    imgH: image?.height(),
    imgW: image?.width()
  })

  const share = async () => {
    await wait(100)
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
      setPreExport(false)
      await context.commands.setMode('edit')
    }
  }

  useEffect(() => {
    if (mode === 'export') {
      setPreExport(true)
    }
  }, [mode])

  useEffect(() => {
    if (preExport) share()
  }, [preExport])

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
      <View style={{ overflow: 'hidden', borderRadius: 10 }}>
        {!!imgRect && (
          <Canvas
            onTouch={touchHandler}
            style={{
              ...imgRect
            }}
            ref={innerRef}
            onLayout={event => {
              var { x, y, width, height } = event.nativeEvent.layout
              context.commands.setCanvasSize({
                width,
                height
              })
            }}
          >
            <Group
            // clip={rrect(rect(0, 0, imgRect.width, imgRect.height), 10, 10)}
            >
              {!!image && <Image image={image} fit='contain' {...imgRect} />}
              {elementComponents}
              {mode === 'export' && elementTextComponents}
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
                text={e.text}
                index={index}
                color={e.color}
              />
            )
        )}
      </View>
    </View>
  )
}
