import { rect, Skia, SkiaDomView } from '@shopify/react-native-skia'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  ArrowIcon,
  BrushPenIcon,
  ChevronLeft,
  CircleIcon,
  DeleteIcon,
  FontIcon,
  SquareIcon
} from './assets'
import { useDrawContext } from './contexts/DrawProvider'
import { ShapeElement } from './contexts/type'

import useWatchDrawing from './hooks/useWatchDrawing'

export default function ToolHeader({
  innerRef,
  exportImage,
  goBack
}: {
  innerRef: React.RefObject<SkiaDomView>
  exportImage?: () => void
  goBack?: () => void
}) {
  const {
    commands: { setState, deleteSelectedItem, getState }
  } = useDrawContext()

  const mode = useWatchDrawing(s => s.mode)
  const canvasSize = useWatchDrawing(s => s.canvasSize)
  const menu = useWatchDrawing(s => s.action)

  const addShape = (type: 'circle' | 'rect' | 'arrow') => {
    const size = 100
    const dime = rect(
      (canvasSize.width - size) / 2,
      (canvasSize.height - size) / 2,
      size,
      size
    )

    const e: ShapeElement = {
      id: Math.random() + '',
      type: type,
      dimensions: dime,
      matrix: Skia.Matrix(),
      color: getState(s => s.color),
      size: 2
    }

    setState({
      elements: [...getState(s => s.elements), e],
      action: 'default'
    })
  }

  return (
    <>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 10,
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 10
        }}
      >
        {!!goBack && (
          <TouchableOpacity onPress={() => goBack()} style={[styles.back]}>
            <ChevronLeft width={24} height={24} fill='#ffffff' />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}></View>

        {mode === 'edit' && (
          <>
            <TouchableOpacity
              onPress={() => addShape('arrow')}
              style={[styles.icon]}
            >
              <ArrowIcon width={20} height={20} fill='#ffffff' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addShape('circle')}
              style={[styles.icon]}
            >
              <CircleIcon width={20} height={20} fill='#ffffff' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addShape('rect')}
              style={[styles.icon]}
            >
              <SquareIcon width={20} height={20} fill='#ffffff' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setState({ action: menu === 'drawing' ? 'default' : 'drawing' })
              }
              style={[styles.icon, menu === 'drawing' && styles.active]}
            >
              <BrushPenIcon
                width={20}
                height={20}
                fill={`${menu === 'drawing' ? '#333' : '#FFF'}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setState({ action: 'addText' })}
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
            {!!exportImage && (
              <TouchableOpacity onPress={() => exportImage()}>
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
            )}
          </>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 4,
    backgroundColor: '#fff5'
  },
  back: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
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
