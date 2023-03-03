import {
  rect,
  Skia,
  SkPoint,
  useTouchHandler
} from '@shopify/react-native-skia'
import { useRef } from 'react'
import { PathType } from '../contexts/type'
import { useDrawContext } from './../contexts/DrawProvider'
import { PathElement } from './../contexts/type'

export const createPath = (
  x: number,
  y: number,
  color: number,
  size: number,
  pathType: PathType
): PathElement => {
  const path = Skia.Path.Make()
  path.moveTo(x, y)
  return {
    type: 'path',
    path,
    color,
    size,
    pathType,
    matrix: Skia.Matrix(),
    dimensions: rect(0, 0, 0, 0)
  }
}

export const useTouchDrawing = () => {
  const prevPointRef = useRef<SkPoint>()
  const drawContext = useDrawContext()

  return useTouchHandler({
    onStart: ({ x, y }) => {
      switch (drawContext.state.action) {
        case 'drawing': {
          const { color, size, pathType, elements } =
            drawContext.commands.getState()

          drawContext.commands.setState({
            elements: [
              ...elements,
              createPath(x, y, color as any, size, pathType)
            ]
          })
          break
        }
        case 'default': {
          const { elements } = drawContext.commands.getState()
          drawContext.commands.setState({
            elements: elements.map(e => ({ ...e, selected: false }))
          })
          break
        }
        default:
          break
      }
      prevPointRef.current = { x, y }
    },
    onActive: ({ x, y }) => {
      switch (drawContext.state.action) {
        case 'drawing': {
          if (drawContext.state.elements.length) {
            const element =
              drawContext.state.elements[drawContext.state.elements.length - 1]

            const xMid = (prevPointRef.current!.x + x) / 2
            const yMid = (prevPointRef.current!.y + y) / 2

            if (element.type === 'path') {
              element.path.quadTo(
                prevPointRef.current!.x,
                prevPointRef.current!.y,
                xMid,
                yMid
              )
            }
          }
          break
        }
        default:
          break
      }
      prevPointRef.current = { x, y }
    },
    onEnd: () => {
      switch (drawContext.state.action) {
        case 'drawing':
          if (drawContext.state.elements.length) {
            const elements = drawContext.commands.getState().elements
            const element = elements[elements.length - 1]

            if (element.type === 'path') {
              drawContext.commands.setState({
                elements: elements.map((e, index) => ({
                  ...e,
                  dimensions:
                    index === elements.length - 1
                      ? element.path.getBounds()
                      : e.dimensions
                }))
              })
            }
          }

          break
        default:
          break
      }
    }
  })
}
