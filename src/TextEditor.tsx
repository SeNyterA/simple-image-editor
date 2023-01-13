import { rect, Skia, useFont, useValue } from '@shopify/react-native-skia'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RobotoMedium } from './assets/fonts'
import TextTool from './components/TextTool'
import {
  DrawboardState,
  ToobarMemu,
  useDrawContext
} from './contexts/DrawProvider'
import { DrawingElement } from './contexts/type'
import useWatchDrawing from './hooks/useWatchDrawing'

export default function TextEditor() {
  const { commands } = useDrawContext()
  const insets = useSafeAreaInsets()
  const menu = useWatchDrawing(
    (state: DrawboardState) => state.menu
  ) as ToobarMemu

  const color = useWatchDrawing((state: DrawboardState) => state.color)

  const [value, setValue] = useState('text')

  // const locationMatrix = useValue(Skia.Matrix())
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
          paddingBottom: insets.bottom
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
        <TouchableWithoutFeedback
          onPress={() => {
            if (!!font) {
              const aa = Skia.Path.MakeFromText(value, 0, 0, font)
              const dime = rect(10, 10, (aa?.getBounds().width || 200) + 16, 40)

              console.log(Skia.Matrix())

              const e: DrawingElement = {
                type: 'text',
                dimensions: dime,
                matrix: Skia.Matrix(),
                font: font,
                text: value
              }
              commands.addTextElement(e)
              console.log('hahas')
            }
            commands?.setMenu('drawing')
          }}
        >
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
                <TextInput
                  multiline
                  autoFocus
                  defaultValue=''
                  onChangeText={t => {
                    setValue(t)

                    // console.log('RobotoMedium', RobotoMedium)
                  }}
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#fff',
                    // textAlignVertical: 'center',
                    textAlign: 'center',
                    marginHorizontal: 20,
                    // backgroundColor: color,
                    borderRadius: 10
                  }}
                  onBlur={() => {}}
                  onLayout={event => {
                    var { x, y, width, height } = event.nativeEvent.layout
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: color
                    }}
                    onLayout={event => {
                      var { x, y, width, height } = event.nativeEvent.layout
                      console.log(x, y, width, height)
                    }}
                  >
                    {value}
                  </Text>
                </TextInput>
              )}
            </View>
            <TextTool />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}
