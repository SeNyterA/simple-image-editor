import React from 'react'
import { Image } from 'react-native'
import useWatchDrawing from '../hooks/useWatchDrawing'

export default function ImgView() {
  const tmpURL = useWatchDrawing(s => s.tmpURL)
  return (
    <Image
      style={{ flex: 1 }}
      source={{
        uri: 'file:' + tmpURL || ''
      }}
    />
  )
}
