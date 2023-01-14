import { SkRect, useSharedValueEffect } from '@shopify/react-native-skia'
import React from 'react'
import { TextInput } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { identity4, processTransform3d } from 'react-native-redash'

interface GestureHandlerProps {
  // matrix: SkiaMutableValue<SkMatrix>
  dimensions: SkRect
  debug?: boolean
  text: string
}

export const GestureHandler = ({
  // matrix: skMatrix,
  dimensions,
  debug,
  text
}: GestureHandlerProps) => {
  const { x, y, width, height } = dimensions
  const offset = useSharedValue({ x: 0, y: 0 })
  const start = useSharedValue({ x: 0, y: 0 })
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)
  const rotation = useSharedValue(0)
  const savedRotation = useSharedValue(0)
  const matrix = useSharedValue(identity4)

  useSharedValueEffect(() => {
    // skMatrix.current = Skia.Matrix(toMatrix3(matrix.value) as any)
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
    .onStart(() => {})
    .onEnd(() => {
      console.log('edittext')
    })

  const composed = Gesture.Race(
    zoomOut,
    select,
    Gesture.Simultaneous(
      dragGesture,
      Gesture.Simultaneous(zoomGesture, rotateGesture)
    )
  )

  const style = useAnimatedStyle(() => ({
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
  }))

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={style}>
        <TextInput
          style={{
            backgroundColor: '#fff',
            fontSize: 24,
            height: '100%',
            borderRadius: 10,
            textAlign: 'center',
            textAlignVertical: 'center'
          }}
        >
          {text}
        </TextInput>
      </Animated.View>
    </GestureDetector>
  )
}
