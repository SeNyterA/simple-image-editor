import { SkFont, SkMatrix, SkRect } from '@shopify/react-native-skia'
import {
  Color,
  SkPath
} from '@shopify/react-native-skia/lib/typescript/src/skia/types'

export type PathType = 'normal' | 'dashed' | 'discreted'
export type DrawingElementType = 'path' | 'text' | 'circle' | 'rect'

export type DrawingElement = {
  type: DrawingElementType
} & (TextElement | PathElement | ShapeElement)

export type TextElement = {
  type: 'text'
  color: Color
  matrix: SkMatrix
  dimensions: SkRect
  selected?: boolean
  text: string
  font: SkFont
}

export type PathElement = {
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
  type: 'rect' | 'circle'
  color: Color
  matrix: SkMatrix
  dimensions: SkRect
  selected?: boolean
  size: number
}
