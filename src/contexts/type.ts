import { SkFont, SkMatrix, SkPath, SkRect } from '@shopify/react-native-skia'
import { Color } from '@shopify/react-native-skia/lib/typescript/src/skia/types'

export type PathType = 'normal' | 'dashed' | 'discreted'
export type DrawingElementType = 'path' | 'text'

export type DrawingElement = {
  id: string
  type: DrawingElementType
  matrix?: SkMatrix
  color?: Color
  dimensions?: SkRect
} & (
  | {
      type: 'path'
      pathType: PathType
      path: SkPath
      size: number
    }
  | {
      type: 'text'
      dimensions: SkRect
      text: string
      font: SkFont
    }
)
