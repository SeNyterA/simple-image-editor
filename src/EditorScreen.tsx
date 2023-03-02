/* eslint-disable react-native/no-inline-styles */
import { ImageFormat, useCanvasRef } from '@shopify/react-native-skia'
import React from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Share from 'react-native-share'
import ContentArea from './ContentArea'
import { useDrawProvider } from './contexts/DrawProvider'
import TextEditor from './TextEditor'
import ToolHeader from './ToolHeader'

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#000000' }]}>
        <StatusBar barStyle='light-content' />
        <DrawProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000',
              overflow: 'hidden'
            }}
          >
            <ToolHeader innerRef={skiaViewRef} exportImage={share} />
            <ContentArea innerRef={skiaViewRef} />
          </View>

          <TextEditor />
        </DrawProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
