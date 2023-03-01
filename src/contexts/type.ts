import { SkFont, SkMatrix, SkRect } from '@shopify/react-native-skia'
import {
  Color,
  SkPath
} from '@shopify/react-native-skia/lib/typescript/src/skia/types'

export type PathType = 'normal' | 'dashed' | 'discreted'
export type DrawingElementType = 'path' | 'text' | 'circle' | 'rect'

export type DrawingElement = {
  type: DrawingElementType
} & (PathElement | TextElement | CircleElement | RectElement)

export type PathElement = {
  type: 'path'
  color: Color
  pathType: PathType
  size: number
  path: SkPath
  selected?: boolean
}

export type TextElement = {
  type: 'text'
  dimensions: SkRect
  text: string
  font: SkFont
  matrix: SkMatrix
  color: Color
  selected?: boolean
}

export type CircleElement = {
  type: 'circle'
  dimensions: SkRect
  matrix: SkMatrix
  color: Color
  selected?: boolean
  size: number
}

export type RectElement = {
  type: 'rect'
  dimensions: SkRect
  matrix: SkMatrix
  color: Color
  selected?: boolean
  size: number
}
