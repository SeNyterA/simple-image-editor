import { Group, ImageSVG, Skia } from '@shopify/react-native-skia'
import React, { memo } from 'react'
import { ShapeElement } from '../contexts/type'

const svgArrowString = (color: string, size: number) =>
  `<svg
        xmlns='http://www.w3.org/2000/svg'
        width='100'
        height='100'
        viewBox='0 0 100 100'
        fill='none'
        >
        <path
            d='M62.5623 18L94.8338 50.2715L62.5623 82.5429'
            stroke='${color}'
            stroke-width='${size}'
            stroke-miterlimit='10'
            stroke-linecap='round'
            stroke-linejoin='round'
        />
        <path
            d='M4.16629 50.2715H94.0654'
            stroke='${color}'
            stroke-width='${size}'
            stroke-miterlimit='10'
            stroke-linecap='round'
            stroke-linejoin='round'
        />
    </svg>`

const ArrowItem = ({ element }: { element: ShapeElement }) => {
  const width = element.dimensions.width
  const height = element.dimensions.height

  const svg = Skia.SVG.MakeFromString(
    svgArrowString(element.color as string, element.size)
  )!

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
        <ImageSVG
          svg={svg}
          rect={{
            x: 0,
            y: 0,
            width: 100,
            height: 100
          }}
        />
      </Group>
    </Group>
  )
}
export default memo(ArrowItem)
