import { SkiaDomView } from '@shopify/react-native-skia'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BrushPenIcon, DeleteIcon, FontIcon } from './assets'
import { useDrawContext } from './contexts/DrawProvider'
import useWatchDrawing from './hooks/useWatchDrawing'

export default function ToolHeader({
  innerRef
}: {
  innerRef: React.RefObject<SkiaDomView>
}) {
  const { commands } = useDrawContext()

  const menu = useWatchDrawing(s => s.menu)

  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10
      }}
    >
      <TouchableOpacity
        onPress={() => commands?.setMenu('drawing')}
        style={[styles.icon, menu === 'drawing' && styles.active]}
      >
        <BrushPenIcon
          width={20}
          height={20}
          fill={`${menu === 'drawing' ? '#333' : '#FFF'}`}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => commands?.setMenu('addText')}
        style={[styles.icon, menu === 'text' && styles.active]}
      >
        <FontIcon
          width={20}
          height={20}
          fill={`${menu === 'text' ? '#333' : '#FFF'}`}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => commands?.setMenu('drawing')}
        style={[styles.icon]}
      >
        <DeleteIcon width={20} height={20} fill='#FFF' />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          commands.setMode('export')
        }}
      >
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

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 10
  },
  active: {
    backgroundColor: '#fff'
  },
  line: {
    height: 30,
    marginHorizontal: 10,
    width: 1,
    backgroundColor: '#fff'
  }
})
