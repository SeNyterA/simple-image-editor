import { Skia, SkRect, useSharedValueEffect } from '@shopify/react-native-skia'
import React, { memo } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { identity4, processTransform3d, toMatrix3 } from 'react-native-redash'
import { useDrawContext } from './contexts/DrawProvider'
import useWatchDrawing from './hooks/useWatchDrawing'

interface GestureHandlerProps {
  debug?: boolean
  index: number
  dimensions: SkRect
}

const GestureHandler = ({ debug, index, dimensions }: GestureHandlerProps) => {
  const context = useDrawContext()
  const { x, y, width, height } = dimensions
  const offset = useSharedValue({ x: 0, y: 0 })
  const start = useSharedValue({ x: 0, y: 0 })
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)
  const rotation = useSharedValue(0)
  const savedRotation = useSharedValue(0)
  const matrix = useSharedValue(identity4)
  const menu = useWatchDrawing(s => s.menu)

  useSharedValueEffect(() => {
    const elements = context.commands.getState().elements

    context.commands.setState({
      elements: elements.map((e, idx) =>
        idx === index
          ? {
              ...e,
              matrix: Skia.Matrix(toMatrix3(matrix.value) as any)
            }
          : e
      )
    })
  }, matrix)

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y
      }

      matrix.value = processTransform3d([
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        {
          rotateZ: rotation.value
        },
        {
          scale: scale.value
        }
      ])
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y
      }
    })

  const zoomGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = savedScale.value * event.scale
      matrix.value = processTransform3d([
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        {
          rotateZ: rotation.value
        },
        {
          scale: scale.value
        }
      ])
    })
    .onEnd(() => {
      savedScale.value = scale.value
    })

  const rotateGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotation.value = savedRotation.value + event.rotation
      matrix.value = processTransform3d([
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        {
          rotateZ: rotation.value
        },
        {
          scale: scale.value
        }
      ])
    })
    .onEnd(() => {
      savedRotation.value = rotation.value
    })

  const zoomOut = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scale.value = savedScale.value * 1.5
      matrix.value = processTransform3d([
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        {
          rotateZ: rotation.value
        },
        {
          scale: scale.value
        }
      ])
    })
    .onEnd(() => {
      savedScale.value = scale.value
    })

  const select = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {})

  const composed = Gesture.Race(
    select,
    Gesture.Simultaneous(
      dragGesture,
      Gesture.Simultaneous(zoomGesture, rotateGesture)
    )
  )

  return (
    <GestureDetector gesture={composed} userSelect='text'>
      <Animated.View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          height,
          backgroundColor: debug ? 'rgba(100, 200, 300, 0.4)' : 'transparent',
          transform: [
            { translateX: offset.value.x },
            { translateY: offset.value.y },
            { scale: scale.value },
            { rotateZ: `${rotation.value}rad` }
          ]
        }}
        onTouchEnd={() => {
          context.commands.selectItem(index)
        }}
      />
    </GestureDetector>
  )
}

export default memo(GestureHandler)
