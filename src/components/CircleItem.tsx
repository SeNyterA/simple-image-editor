import { Circle, Group, Paint, vec } from '@shopify/react-native-skia'
import { ShapeElement } from '../contexts/type'

export const CircleItem = ({ element }: { element: ShapeElement }) => {
  const width = element.dimensions.width
  const height = element.dimensions.height
  const strokeWidth = element.size
  const c = vec(width / 2, height / 2)
  const r = (width - strokeWidth) / 2
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
        <Circle c={c} r={r} color='#0000'>
          <Paint
            color={element.color}
            style='stroke'
            strokeWidth={strokeWidth}
          />
        </Circle>
      </Group>
    </Group>
  )
}
