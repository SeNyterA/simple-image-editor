import React from 'react'
import { View } from 'react-native'
import useWatchDrawing from '../hooks/useWatchDrawing'
import ColorPicker from './ColorPicker'
import PathTypePicker from './PathTypePicker'
export default function TextTool() {
  const menu = useWatchDrawing(state => state.action)
  return (
    <View
      style={{
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }}
      onLayout={event => {
        var { x, y, width, height } = event.nativeEvent.layout
      }}
    >
      {menu === 'drawing' && <PathTypePicker />}
      <ColorPicker />
    </View>
  )
}
