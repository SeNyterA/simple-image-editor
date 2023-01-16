import { useEffect, useState } from 'react'
import { useDrawContext } from '../contexts/DrawProvider'
import { DrawboardState } from './../contexts/DrawProvider'

export default function useWatchDrawing(cb: (state: DrawboardState) => any) {
  const drawContext = useDrawContext()
  const [state, setState] = useState(cb(drawContext.state))
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
