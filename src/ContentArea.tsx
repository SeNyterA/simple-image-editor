import { SkiaDomView } from '@shopify/react-native-skia'
import React from 'react'
import DrawingBoard from './DrawingBoard'
import useWatchDrawing from './hooks/useWatchDrawing'
import TestCamera from './testcam/TestCamera'

export default function ContentArea({
  innerRef
}: {
  innerRef: React.RefObject<SkiaDomView>
}) {
  const urlBase = useWatchDrawing(s => s.baseURL)

  return (
    <>
      {urlBase ? (
        <DrawingBoard innerRef={innerRef} baseURL={urlBase} />
      ) : (
        // <ImgView />
        <TestCamera />
      )}
    </>
  )
}
