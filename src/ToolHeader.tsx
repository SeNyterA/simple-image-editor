import { ImageFormat, SkiaDomView } from '@shopify/react-native-skia'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ToolbarMode, useDrawContext } from './contexts/DrawProvider'
import Share from 'react-native-share'
import useWatchDrawing from './hooks/useWatchDrawing'

export default function ToolHeader({
  innerRef
}: {
  innerRef: React.RefObject<SkiaDomView>
}) {
  const { commands } = useDrawContext()

  const mode = useWatchDrawing(s => s.mode) as ToolbarMode

  const share = async () => {
    await commands.setMode(mode === 'edit' ? 'export' : 'edit')
    // const image = innerRef.current?.makeImageSnapshot()

    // if (image) {
    //   const data = image.encodeToBase64(ImageFormat.PNG, 100)
    //   const url = `data:image/png;base64,${data}`
    //   const shareOptions = {
    //     title: 'Sharing image from awesome drawing app',
    //     message: 'My drawing',
    //     url,
    //     failOnCancel: false
    //   }
    //   await Share.open(shareOptions)
    // }
  }

  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10
      }}
    >
      <TouchableOpacity onPress={() => commands?.setMenu('addText')}>
        <Text
          style={{
            color: '#fff',
            paddingHorizontal: 6,
            fontSize: 16,
            fontWeight: '600'
          }}
        >
          addText
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          share()
        }}
      >
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
    </View>
  )
}
