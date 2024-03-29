import { rect, Skia, useFont } from '@shopify/react-native-skia'
import React from 'react'
import {
  Keyboard,
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
import { useDrawContext } from './contexts/DrawProvider'
import { TextElement } from './contexts/type'
import useWatchDrawing from './hooks/useWatchDrawing'

export default function TextEditor() {
  const {
    commands: { getState, setState }
  } = useDrawContext()
  const insets = useSafeAreaInsets()
  const {
    action: menu,
    color,
    mode,
    canvasSize,
    editTextElementId
  } = useWatchDrawing(
    ({ action, color, mode, canvasSize, editTextElementId }) => ({
      action,
      color,
      mode,
      canvasSize,
      editTextElementId
    })
  )
  const font = useFont(RobotoMedium, 24)

  const editTextElement = getState(
    state =>
      state.elements.find(e => e.id === editTextElementId) as
        | TextElement
        | undefined
  )

  const visible: ViewStyle =
    menu === 'addText'
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          paddingBottom: insets.bottom || 32,
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
        <TouchableWithoutFeedback
          style={{
            flex: 1
          }}
          onPress={() => {
            Keyboard.dismiss()
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
                  defaultValue={editTextElement?.text || ''}
                  onEndEditing={({ nativeEvent: { text } }) => {
                    if (!!font && text) {
                      const aa = Skia.Path.MakeFromText(text, 0, 0, font)
                      const width = (aa?.getBounds().width || 200) + 16
                      const dime = rect(
                        (canvasSize.width - width) / 2,
                        (canvasSize.height - 40) / 2,
                        width,
                        40
                      )
                      const textE: TextElement = {
                        id: editTextElement?.id || Math.random() + '',
                        type: 'text',
                        dimensions: dime,
                        matrix: Skia.Matrix(),
                        font: font,
                        text: text,
                        color: color
                      }

                      if (editTextElement) {
                        setState({
                          elements: [
                            ...getState(s => s.elements).map(e =>
                              e.id === editTextElement.id ? textE : e
                            )
                          ],
                          action: 'default',
                          editTextElementId: undefined
                        })
                      } else
                        setState({
                          elements: [...getState(s => s.elements), textE],
                          action: 'default',
                          editTextElementId: undefined
                        })
                    } else
                      setState({
                        action: 'default'
                      })
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
            {mode === 'edit' && <TextTool />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}
