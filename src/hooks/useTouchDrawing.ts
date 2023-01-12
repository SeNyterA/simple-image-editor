import { Skia, SkPoint, useTouchHandler } from '@shopify/react-native-skia'
import { useRef } from 'react'
import { DrawingElement, PathType } from '../contexts/type'
import { useDrawContext } from './../contexts/DrawProvider'

export const createPath = (
  x: number,
  y: number,
  color: number,
  size: number,
  pathType: PathType
): DrawingElement => {
  const path = Skia.Path.Make()
  path.moveTo(x, y)
  return {
    type: 'path',
    path,
    color,
    size,
    pathType
  }
}

export const useTouchDrawing = () => {
  const prevPointRef = useRef<SkPoint>()
  const stateRef = useRef<'create' | 'drawing'>('create')

  const drawContext = useDrawContext()

  return useTouchHandler({
    onStart: ({ x, y }) => {
      switch (drawContext.state.menu) {
        case undefined:
        case 'drawing': {
          const { color, size, pathType } = drawContext.state
          drawContext.commands.addElement(
            createPath(x, y, color, size, pathType)
          )
          stateRef.current = 'create'
          break
        }
        default:
          break
      }
      prevPointRef.current = { x, y }
    },
    onActive: ({ x, y }) => {
      switch (drawContext.state.menu) {
        case undefined:
        case 'drawing': {
          if (drawContext.state.elements.length) {
            const element =
              drawContext.state.elements[drawContext.state.elements.length - 1]
            const xMid = (prevPointRef.current!.x + x) / 2
            const yMid = (prevPointRef.current!.y + y) / 2
            element.path.quadTo(
              prevPointRef.current!.x,
              prevPointRef.current!.y,
              xMid,
              yMid
            )
            stateRef.current = 'drawing'
          }
          break
        }
        default:
          break
      }
      prevPointRef.current = { x, y }
    },
    onEnd: () => {
      switch (drawContext.state.menu) {
        case undefined:
        case 'drawing': {
          if (stateRef.current === 'create')
            drawContext.commands.removeElement(0)

          break
        }
        default:
          break
      }
    }
  })
}
