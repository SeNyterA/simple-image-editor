import { View, Text } from 'react-native'
import React from 'react'
import PathTypePicker from './PathTypePicker'
import ColorPicker from './ColorPicker'

export default function TextTool() {
  return (
    <View
      style={{
        height: 60,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'red'
      }}
      onLayout={event => {
        var { x, y, width, height } = event.nativeEvent.layout
        console.log(height)
      }}
    >
      <PathTypePicker />
      <ColorPicker />
    </View>
  )
}
