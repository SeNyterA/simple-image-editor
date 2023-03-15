/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import {
  Group,
  rect,
  RoundedRect,
  rrect,
  Text
} from '@shopify/react-native-skia'
import { memo } from 'react'
import { TextElement } from '../contexts/type'

const TextItem = ({ textElement }: { textElement: TextElement }) => {
  return (
    <Group
      transform={[
        { translateX: textElement.dimensions.x },
        { translateY: textElement.dimensions.y }
      ]}
    >
      <Group
        matrix={textElement.matrix}
        origin={{
          x: textElement.dimensions.width / 2,
          y: textElement.dimensions.height / 2
        }}
      >
        <RoundedRect
          color={textElement.color}
          rect={rrect(
            rect(
              0,
              0,
              textElement.dimensions.width,
              textElement.dimensions.height
            ),
            6,
            6
          )}
        />
        <Group
          transform={[
            { translateX: 8 },
            {
              translateY:
                textElement.dimensions.height / 2 +
                (textElement.dimensions.height - textElement.font.getSize()) / 2
            }
          ]}
        >
          <Text text={textElement.text || ''} font={textElement.font} />
        </Group>
      </Group>
    </Group>
  )
}
export default memo(TextItem)
