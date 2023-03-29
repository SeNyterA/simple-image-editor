import { SkiaDomView } from '@shopify/react-native-skia'
import React from 'react'
import CameraContent from './camera/CameraContent'
import DrawingBoard from './DrawingBoard'
import useWatchDrawing from './hooks/useWatchDrawing'

export default function ContentArea({
  innerRef,
  exportFn
}: {
  innerRef: React.RefObject<SkiaDomView>
  exportFn?: (base64: string) => void
}) {
  const tmpURL = useWatchDrawing(s => s.tmpURL)
  const editURL = useWatchDrawing(s => s.editURL)
  const mode = useWatchDrawing(s => s.mode)
  const file = editURL || `file://${tmpURL}`

  return (
    <>
      {mode === 'edit' ? (
        <DrawingBoard innerRef={innerRef} tmpURL={file} />
      ) : (
        <CameraContent exportFn={exportFn} />
      )}
    </>
  )
}
