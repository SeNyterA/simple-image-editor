import {
  Circle,
  Paint,
  Rect,
  RoundedRect,
  vec
} from '@shopify/react-native-skia'
const width = 256
const height = 256
export const CircleItem = () => {
  const strokeWidth = 4
  const c = vec(width / 2, height / 2)
  const r = (width - strokeWidth) / 2
  return (
    <Circle c={c} r={r} blendMode={'color'}>
      <Paint color='#fffefe' style='stroke' strokeWidth={strokeWidth} />
    </Circle>
  )
}

export const RectItem = () => {
  const strokeWidth = 4

  return (
    <Rect x={0} y={4} width={256} height={256} blendMode={'color'}>
      <Paint color='#f3efef' style='stroke' strokeWidth={strokeWidth} />
    </Rect>
  )
}
