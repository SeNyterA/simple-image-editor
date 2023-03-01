import { rect, Skia, useFont } from '@shopify/react-native-skia'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RobotoMedium } from './assets/fonts'
import TextTool from './components/TextTool'
import { DrawboardState, useDrawContext } from './contexts/DrawProvider'
import { TextElement } from './contexts/type'
import useWatchDrawing from './hooks/useWatchDrawing'

export default function TextEditor() {
  const { commands } = useDrawContext()
  const insets = useSafeAreaInsets()
  const menu = useWatchDrawing((state: DrawboardState) => state.menu)
  const color = useWatchDrawing((state: DrawboardState) => state.color)
  const canvasSize = useWatchDrawing(s => s.canvasSize)
  const [value, setValue] = useState('khang dep')
  const font = useFont(RobotoMedium, 24)

  const visible: ViewStyle =
    menu === 'addText'
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          paddingBottom: insets.bottom,
          paddingTop: insets.top
        }
      : {
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          paddingBottom: insets.bottom
        }

  return (
    <View style={[visible, { justifyContent: 'center', alignItems: 'center' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%', position: 'relative' }}
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <View
            style={{
              flex: 1
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center'
              }}
              onLayout={event => {
                var { x, y, width, height } = event.nativeEvent.layout
              }}
            >
              {menu === 'addText' && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                >
                  <TextInput
                    autoFocus
                    defaultValue=''
                    onEndEditing={() => {
                      if (!!font && value) {
                        const aa = Skia.Path.MakeFromText(value, 0, 0, font)
                        const width = (aa?.getBounds().width || 200) + 16
                        const dime = rect(
                          (canvasSize.width - width) / 2,
                          (canvasSize.height - 40) / 2,
                          width,
                          40
                        )

                        const textE: TextElement = {
                          type: 'text',
                          dimensions: dime,
                          matrix: Skia.Matrix(),
                          font: font,
                          text: value,
                          color: color
                        }

                        const { elements } = commands.getState()

                        commands.setState({
                          elements: [...elements, textE],
                          menu: 'text'
                        })
                      }
                    }}
                    style={{
                      padding: 6,
                      backgroundColor: color as any,
                      marginHorizontal: 20,
                      fontSize: 24,
                      height: '100%',
                      borderRadius: 6,
                      textAlign: 'center'
                    }}
                  />
                </View>
              )}
            </View>
            <TextTool />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}
