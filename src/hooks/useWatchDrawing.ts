import { useEffect, useState } from 'react'
import { color } from 'react-native-reanimated'
import { useDrawContext } from '../contexts/DrawProvider'
import { DrawboardState } from './../contexts/DrawProvider'

export default function useWatchDrawing(cb: (state: DrawboardState) => any) {
  const drawContext = useDrawContext()
  const [state, setState] = useState<any>(cb(drawContext.state))
  useEffect(() => {
    const unsubscribeDraw = drawContext.addListener(stateTmp => {
      setState(cb(stateTmp))
    })
    return () => {
      unsubscribeDraw()
    }
  }, [drawContext, cb])
  return state
}
