/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import DrawProvider from './contexts/DrawProvider'
import DrawingBoard from './DrawingBoard'
import TextEditor from './TextEditor'
import ToolBottom from './ToolBottom'
import ToolHeader from './ToolHeader'

export default function EditorScreen() {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#000000' }]}>
      <StatusBar barStyle='light-content' />

      <DrawProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: '#111',
            borderRadius: 20,
            overflow: 'hidden'
          }}
        >
          <ToolHeader />
          <DrawingBoard />
          <ToolBottom />
        </View>

        <TextEditor />
      </DrawProvider>
    </SafeAreaView>
  )
}
