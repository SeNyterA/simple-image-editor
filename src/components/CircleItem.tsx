import { Circle, Group, Paint, vec } from '@shopify/react-native-skia'
import { CircleElement, RectElement } from '../contexts/type'

interface Props {
  element: CircleElement
}
export const CircleItem = ({ element }: Props) => {
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
        {/* {element.selected && (
          <Rect width={width} height={height} color='#0000'>
            <Paint color='#066fbf' style='stroke' strokeWidth={1} />
          </Rect>
        )} */}

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
