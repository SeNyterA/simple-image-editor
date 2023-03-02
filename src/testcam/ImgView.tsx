import React from 'react'
import { Image } from 'react-native'
import useWatchDrawing from '../hooks/useWatchDrawing'

export default function ImgView() {
  const baseURL = useWatchDrawing(s => s.baseURL)
  return (
    <Image
      style={{ flex: 1 }}
      source={{
        uri: 'file:' + baseURL || ''
      }}
    />
  )
}
