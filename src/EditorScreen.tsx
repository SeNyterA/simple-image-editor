import { ImageFormat, useCanvasRef } from '@shopify/react-native-skia'
import React from 'react'
import { ActivityIndicator, SafeAreaView, StatusBar, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ContentArea from './ContentArea'
import { DrawboardState, useDrawProvider } from './contexts/DrawProvider'
import TextEditor from './TextEditor'
import ToolHeader from './ToolHeader'

interface Props {
  exportFn?: (url: string) => void
  goBackFn?: () => void
  defaultState?: Partial<DrawboardState>
  loading?: boolean
}

export default function EditorScreen({
  exportFn,
  goBackFn,
  defaultState,
  loading
}: Props) {
  const DrawProvider = useDrawProvider({ ...defaultState })
  const skiaViewRef = useCanvasRef()

  const calData = async () => {
    const image = skiaViewRef.current?.makeImageSnapshot()
    if (image) {
      const data = image.encodeToBase64(ImageFormat.PNG, 100)
      const url = `data:image/png;base64,${data}`
      exportFn && exportFn(url)
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              <ContentArea innerRef={skiaViewRef} exportFn={exportFn} />
            </View>

            <TextEditor />
          </DrawProvider>

          {loading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ActivityIndicator color={'#fff'} />
            </View>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
