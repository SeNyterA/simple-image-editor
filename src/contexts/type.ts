import { SkFont, SkMatrix, SkRect } from '@shopify/react-native-skia'
import {
  Color,
  SkPath
} from '@shopify/react-native-skia/lib/typescript/src/skia/types'

export type PathType = 'normal' | 'dashed' | 'discreted'
export type DrawingElementType = 'path' | 'text'

export type DrawingElement = {
  type: DrawingElementType
  selected?: boolean
} & (PathElement | TextElement)

export type PathElement = {
  type: 'path'
  color: Color
  pathType: PathType
  size: number
  path: SkPath
}

export type TextElement = {
  type: 'text'
  dimensions: SkRect
  text: string
  font: SkFont
  matrix: SkMatrix
  color: Color
}
