import {
  DashPathEffect,
  DiscretePathEffect,
  Group,
  Paint,
  Path,
  Rect
} from '@shopify/react-native-skia'
import React, { memo } from 'react'

import { PathElement } from '../contexts/type'

const PathItem = ({ element }: { element: PathElement }) => {
  const { x, y, width, height } = element.dimensions

  const renderItem = () => {
    switch (element.pathType) {
      case 'discreted':
        return (
          <Path
            path={element.path}
            color={element.color}
            style='stroke'
            strokeWidth={element.size}
            strokeCap='round'
          >
            <DiscretePathEffect length={3} deviation={5} />
          </Path>
        )
      case 'dashed':
        return (
          <Path
            path={element.path}
            color={element.color}
            style='stroke'
            strokeWidth={element.size}
            strokeCap='round'
          >
            <DashPathEffect intervals={[element.size * 2, element.size * 2]} />
          </Path>
        )
      default:
        return (
          <Path
            path={element.path}
            color={element.color}
            style='stroke'
            strokeWidth={element.size}
            strokeCap='round'
          />
        )
    }
  }

  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Group
        matrix={element.matrix}
        origin={{
          x: width / 2,
          y: height / 2
        }}
      >
        <Group transform={[{ translateX: -x }, { translateY: -y }]}>
          {renderItem()}
        </Group>
      </Group>
    </Group>
  )
}

export default memo(PathItem)
