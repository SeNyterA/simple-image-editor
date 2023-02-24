import {
  DashPathEffect,
  DiscretePathEffect,
  Group,
  Path
} from '@shopify/react-native-skia'
import React from 'react'
import { PathElement } from '../contexts/type'

export default function PathItem({ element }: { element: PathElement }) {
  const renderItem = () => {
    switch (element.pathType) {
      case 'discreted':
        return (
          <Group>
            <Path
              path={element.path}
              color={element.color}
              style='stroke'
              strokeWidth={element.size}
              strokeCap='round'
            >
              <DiscretePathEffect length={3} deviation={5} />
            </Path>
          </Group>
        )
      case 'dashed':
        return (
          <Group>
            <Path
              path={element.path}
              color={element.color}
              style='stroke'
              strokeWidth={element.size}
              strokeCap='round'
            >
              <DashPathEffect
                intervals={[element.size * 2, element.size * 2]}
              />
            </Path>
          </Group>
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

  return <>{renderItem()}</>
}
