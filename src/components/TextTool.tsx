import { View, Text } from 'react-native'
import React from 'react'
import PathTypePicker from './PathTypePicker'
import ColorPicker from './ColorPicker'
import useWatchDrawing from '../hooks/useWatchDrawing'
import { ToobarMemu } from '../contexts/DrawProvider'

export default function TextTool() {
  const menu = useWatchDrawing(state => state.menu) as ToobarMemu
  return (
    <View
      style={{
        height: 60,
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
