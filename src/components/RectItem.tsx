import { Group, Paint, Rect } from '@shopify/react-native-skia'
import { ShapeElement } from '../contexts/type'

export const RectItem = ({ element }: { element: ShapeElement }) => {
  const width = element.dimensions.width
  const height = element.dimensions.height
  const strokeWidth = element.size

  return (
    <Group
      transform={[
        { translateX: element.dimensions.x },
        { translateY: element.dimensions.y }
      ]}
    >
      <Group
        matrix={element.matrix}
        origin={{
          x: width / 2,
          y: height / 2
        }}
      >
        <Rect width={width} height={height} color='#0000'>
          <Paint
            color={element.color}
            style='stroke'
            strokeWidth={strokeWidth}
          />
        </Rect>
      </Group>
    </Group>
  )
}
