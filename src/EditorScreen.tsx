/* eslint-disable react-native/no-inline-styles */
import { useCanvasRef, useImage } from '@shopify/react-native-skia'
import React, { useMemo, useState } from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDrawProvider } from './contexts/DrawProvider'
import DrawingBoard from './DrawingBoard'
import TextEditor from './TextEditor'
import ToolHeader from './ToolHeader'

export default function EditorScreen() {
  const [count, setCount] = useState(1)
  const DrawProvider = useDrawProvider()
  const skiaViewRef = useCanvasRef()

  const renderDrawingBoard = useMemo(
    () => (
      <DrawProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: '#111',
            borderRadius: 20,
            overflow: 'hidden'
          }}
        >
          <ToolHeader setCount={setCount} />
          <DrawingBoard innerRef={skiaViewRef} />
          {/* <ToolBottom /> */}

          <View style={{ height: 60, padding: 10 }}></View>
        </View>

        <TextEditor />
      </DrawProvider>
    ),
    []
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#000000' }]}>
        <StatusBar barStyle='light-content' />
        {renderDrawingBoard}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
