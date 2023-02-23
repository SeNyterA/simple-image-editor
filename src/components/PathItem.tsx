import {
  DashPathEffect,
  DiscretePathEffect,
  Group,
  Path
} from '@shopify/react-native-skia'
import React, { memo } from 'react'
import useWatchDrawing from '../hooks/useWatchDrawing'

const PathItem = ({ id }: { id: string }) => {
  const element = useWatchDrawing(s => s.elements.find(e => e.id === id))

  const renderItem = () => {
    if (element?.type === 'path')
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

export default memo(PathItem)
