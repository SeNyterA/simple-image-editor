/* eslint-disable react-native/no-inline-styles */
import { ImageFormat, useCanvasRef } from '@shopify/react-native-skia'
import React, { useMemo } from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ContentArea from './ContentArea'
import { useDrawProvider } from './contexts/DrawProvider'
import TextEditor from './TextEditor'
import ToolHeader from './ToolHeader'
import Share from 'react-native-share'

export default function EditorScreen() {
  const DrawProvider = useDrawProvider()
  const skiaViewRef = useCanvasRef()

  const share = async () => {
    const image = skiaViewRef.current?.makeImageSnapshot()
    if (image) {
      const data = image.encodeToBase64(ImageFormat.PNG, 100)
      const url = `data:image/png;base64,${data}`
      const shareOptions = {
        title: 'Sharing image from awesome drawing app',
        message: 'My drawing',
        url,
        failOnCancel: false
      }
      await Share.open(shareOptions)
    }
  }

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
          <ToolHeader innerRef={skiaViewRef} exportImage={share} />

          <ContentArea innerRef={skiaViewRef} />

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
