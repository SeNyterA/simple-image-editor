/* eslint-disable react-native/no-inline-styles */
import { ImageFormat, useCanvasRef } from '@shopify/react-native-skia'
import React from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ContentArea from './ContentArea'
import { DrawboardState, useDrawProvider } from './contexts/DrawProvider'
import TextEditor from './TextEditor'
import ToolHeader from './ToolHeader'

interface Props {
  exportFn: (base64: string) => void
  goBackFn: () => void
  defaultState?: Partial<DrawboardState>
}

export default function EditorScreen({
  exportFn,
  goBackFn,
  defaultState
}: Props) {
  const DrawProvider = useDrawProvider({ ...defaultState })
  const skiaViewRef = useCanvasRef()

  const calData = async () => {
    const image = skiaViewRef.current?.makeImageSnapshot()
    if (image) {
      const data = image.encodeToBase64(ImageFormat.PNG, 100)
      const url = `data:image/png;base64,${data}`
      // const shareOptions = {
      //   title: 'Sharing image from awesome drawing app',
      //   message: 'My drawing',
      //   url,
      //   failOnCancel: false
      // }
      // await Share.open(shareOptions)
      exportFn(url)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#000000' }]}>
        <StatusBar barStyle='light-content' backgroundColor='#000' />
        <DrawProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000',
              overflow: 'hidden'
            }}
          >
            <ToolHeader
              innerRef={skiaViewRef}
              exportImage={calData}
              goBack={goBackFn}
            />
            <ContentArea innerRef={skiaViewRef} />
          </View>

          <TextEditor />
        </DrawProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
