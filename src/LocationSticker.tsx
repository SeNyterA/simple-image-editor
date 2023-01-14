/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import type {
  SkFont, SkMatrix,
  SkRect
} from '@shopify/react-native-skia'
import {
  Group,
  rect,
  RoundedRect,
  rrect,
  Skia,
  Text
} from '@shopify/react-native-skia'
import { DrawboardContextType } from './contexts/DrawProvider'

const x = 10
const y = 10
const width = 300
const height = 40

export const LocationStickerDimensions = rect(x, y, width, height)
const path = Skia.Path.MakeFromSVGString(
  'M16.6667 0C12.2466 0 8.00694 1.75627 4.88135 4.88135C1.75635 8.00714 0 12.2466 0 16.6667C0 33.3333 16.6667 50 16.6667 50C16.6667 50 33.3333 33.3333 33.3333 16.6667C33.3333 12.2466 31.5771 8.00695 28.452 4.88135C25.3262 1.75635 21.0867 0 16.6667 0ZM16.6667 23.244C14.9189 23.244 13.2417 22.5496 12.0063 21.3126C10.7709 20.0764 10.0765 18.3991 10.078 16.6515C10.0788 14.903 10.7748 13.2273 12.0118 11.992C13.2488 10.7573 14.9261 10.0644 16.6745 10.066C18.4222 10.0683 20.0979 10.7651 21.3326 12.0028C22.5665 13.2406 23.2586 14.9185 23.2555 16.6663C23.2524 18.4117 22.5572 20.085 21.3217 21.3181C20.0863 22.5512 18.4122 23.2441 16.6668 23.2441L16.6667 23.244Z'
)!
const bounds = path.computeTightBounds()

interface LocationStickerProps {
  matrix: SkMatrix
  font: SkFont
  text: string
  rectDimensions?: SkRect
  index: number
  context: DrawboardContextType
}

export const LocationSticker = ({
  // matrix,
  font,
  text,
  rectDimensions = rect(10, 10, 200, 40),
  index,
  context
}: LocationStickerProps) => {
  // const aa = Skia.Path.MakeFromText(text, 0, 0, font)

  // const {} = useWatchDrawing(e => e.textElements[index]?.matrix)

  return (
    <Group
      transform={[
        { translateX: rectDimensions.x },
        { translateY: rectDimensions.y }
      ]}
    >
      <Group
        matrix={(context.state.textElements[index] as any).matrix}
        origin={{
          x: rectDimensions.width / 2,
          y: rectDimensions.height / 2
        }}
      >
        <RoundedRect
          color='white'
          rect={rrect(
            rect(0, 0, rectDimensions.width, rectDimensions.height),
            6,
            6
          )}
        />
        <Group
          transform={[
            { translateX: 8 },
            {
              translateY:
                rectDimensions.height / 2 +
                (rectDimensions.height - font.getSize()) / 2
            }
          ]}
        >
          <Text text={text || ''} font={font} />
        </Group>
      </Group>
    </Group>
  )
}
