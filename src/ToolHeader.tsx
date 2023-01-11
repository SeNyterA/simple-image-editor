import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDrawContext } from './contexts/DrawProvider'

export default function ToolHeader({ setCount }) {
  const { commands } = useDrawContext()

  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10
      }}
    >
      <TouchableOpacity onPress={() => commands?.setMenu('addText')}>
        <Text
          style={{
            color: '#fff',
            paddingHorizontal: 6,
            fontSize: 16,
            fontWeight: '600'
          }}
        >
          addText
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCount?.(Math.random())}>
        <Text
          style={{
            color: '#fff',
            paddingHorizontal: 6,
            fontSize: 16,
            fontWeight: '600'
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  )
}
