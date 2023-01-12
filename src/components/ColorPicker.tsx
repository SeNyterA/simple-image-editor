import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import React, { Fragment } from 'react'
import useWatchDrawing from '../hooks/useWatchDrawing'
import { useDrawContext } from '../contexts/DrawProvider'

const colors = [
  '#FFF',
  '#000',
  '#0FFA',
  '#0F0A',
  '#FF0',
  '#ffa200',
  '#fe5f9f',
  '#ff0000'
]

export default function ColorPicker() {
  const color = useWatchDrawing(state => state.color)
  const {
    commands: { setColor }
  } = useDrawContext()
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          //   justifyContent: 'center',
          alignItems: 'center'
        }}
        style={{ height: 50 }}
      >
        {colors.map((c, index) => (
          <Fragment key={index}>
            <TouchableOpacity
              style={[styles.icon, c === color && styles.active]}
              onPress={() => setColor(c)}
            >
              <View
                style={{
                  backgroundColor: c,
                  width: '100%',
                  height: '100%',
                  borderRadius: 100
                }}
              />
            </TouchableOpacity>
            {index !== colors.length - 1 && <View style={{ margin: 3 }} />}
          </Fragment>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 2
  },
  active: {
    borderWidth: 2,
    borderColor: '#aaa'
  },
  line: {
    height: 30,
    marginHorizontal: 10,
    width: 1,
    backgroundColor: '#fff'
  }
})
