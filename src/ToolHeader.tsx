import { rect, Skia, SkiaDomView } from '@shopify/react-native-skia'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BrushPenIcon, CircleIcon, DeleteIcon, FontIcon, SquareIcon } from './assets'
import { useDrawContext } from './contexts/DrawProvider'
import { CircleElement, RectElement } from './contexts/type'
import useWatchDrawing from './hooks/useWatchDrawing'

export default function ToolHeader({
  innerRef
}: {
  innerRef: React.RefObject<SkiaDomView>
}) {
  const {
    commands: { setState, deleteSelectedItem, getState }
  } = useDrawContext()

  const menu = useWatchDrawing(s => s.menu)
  const canvasSize = useWatchDrawing(s => s.canvasSize)

  const addCricle = () => {
    const size = 100
    const dime = rect(
      (canvasSize.width - size) / 2,
      (canvasSize.height - size) / 2,
      size,
      size
    )

    const e: CircleElement = {
      type: 'circle',
      dimensions: dime,
      matrix: Skia.Matrix(),
      color: getState().color,
      size: 1
    }

    const { elements } = getState()
    setState({
      elements: [...elements, e],
      menu: 'default'
    })
  }

  const addRect = () => {
    const size = 100
    const dime = rect(
      (canvasSize.width - size) / 2,
      (canvasSize.height - size) / 2,
      size,
      size
    )

    const e: RectElement = {
      type: 'rect',
      dimensions: dime,
      matrix: Skia.Matrix(),
      color: getState().color,
      size: 1
    }

    const { elements } = getState()
    setState({
      elements: [...elements, e],
      menu: 'default'
    })
  }

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
      <TouchableOpacity onPress={() => addCricle()} style={[styles.icon]}>
        <CircleIcon width={20} height={20} fill='#ffffff' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addRect()} style={[styles.icon]}>
        <SquareIcon width={20} height={20} fill='#ffffff' />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setState({ menu: 'drawing' })}
        style={[styles.icon, menu === 'drawing' && styles.active]}
      >
        <BrushPenIcon
          width={20}
          height={20}
          fill={`${menu === 'drawing' ? '#333' : '#FFF'}`}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setState({ menu: 'addText' })}
        style={[styles.icon]}
      >
        <FontIcon width={20} height={20} fill='#FFF' />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.icon]}
        onPress={() => deleteSelectedItem()}
      >
        <DeleteIcon width={20} height={20} fill='#FFF' />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
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
