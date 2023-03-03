import React, { Fragment } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDrawContext } from '../contexts/DrawProvider'
import useWatchDrawing from '../hooks/useWatchDrawing'

const colors = [
  '#FFF',
  '#000',
  '#0FF',
  '#0F0',
  '#FF0',
  '#ffa200',
  '#fe5f9f',
  '#ff0000'
]

export default function ColorPicker() {
  const color = useWatchDrawing(state => state.color)
  const {
    commands: { setState, getState }
  } = useDrawContext()
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          alignItems: 'center'
        }}
        style={{ height: 50 }}
        keyboardShouldPersistTaps='always'
      >
        {colors.map((c, index) => (
          <Fragment key={index}>
            <TouchableOpacity
              style={[styles.icon, c === color && styles.active]}
              onPress={() =>
                setState({
                  color: c,
                  elements: getState().elements.map(e => ({
                    ...e,
                    color: e.selected ? c : e.color
                  }))
                })
              }
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
