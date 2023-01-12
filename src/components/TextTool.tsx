import { View, Text } from 'react-native'
import React from 'react'
import PathTypePicker from './PathTypePicker'
import ColorPicker from './ColorPicker'

export default function TextTool() {
  return (
    <View
      style={{
        height: 60,
        alignItems: 'center',
        flexDirection: 'row'
      }}
      onLayout={event => {
        var { x, y, width, height } = event.nativeEvent.layout
      }}
    >
      <PathTypePicker />
      <ColorPicker />
    </View>
  )
}
