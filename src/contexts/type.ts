import { SkFont, SkMatrix, SkRect } from '@shopify/react-native-skia'
import {
  Color,
  SkPath
} from '@shopify/react-native-skia/lib/typescript/src/skia/types'

export type PathType = 'normal' | 'dashed' | 'discreted'
export type DrawingElementType = 'path' | 'text' | 'circle' | 'rect' | 'arrow'

export type DrawingElement = {
  type: DrawingElementType
  id: string
} & (TextElement | PathElement | ShapeElement)

export type TextElement = {
  id: string
  type: 'text'
  color: Color
  matrix: SkMatrix
  dimensions: SkRect
  selected?: boolean
  text: string
  font: SkFont
}

export type PathElement = {
  id: string
  type: 'path'
  color: Color
  matrix: SkMatrix
  dimensions: SkRect
  selected?: boolean
  pathType: PathType
  size: number
  path: SkPath
}

export type ShapeElement = {
  id: string
  type: 'rect' | 'circle' | 'arrow'
  color: Color
  matrix: SkMatrix
  dimensions: SkRect
  selected?: boolean
  size: number
}
