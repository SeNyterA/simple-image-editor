import { ImageFormat, SkiaDomView } from '@shopify/react-native-skia'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDrawContext } from './contexts/DrawProvider'
import Share from 'react-native-share'

export default function ToolHeader({
  innerRef
}: {
  innerRef: React.RefObject<SkiaDomView>
}) {
  const { commands } = useDrawContext()

  const share = async () => {
    // await drawContext.commands.cleanUseless()
    const image = innerRef.current?.makeImageSnapshot()

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
      <TouchableOpacity onPress={() => {share()}}>
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
