import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { BrushDashedIcon, BrushStrokeIcon } from '../assets'
import { useDrawContext } from '../contexts/DrawProvider'
import useWatchDrawing from '../hooks/useWatchDrawing'

export default function PathTypePicker() {
  const pathType = useWatchDrawing(state => state.pathType)
  const {
    commands: { setPathType }
  } = useDrawContext()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        style={[styles.icon, pathType === 'normal' && styles.active]}
        onPress={() => setPathType('normal')}
      >
        <BrushStrokeIcon fill='#FFF' height={28} width={28} />
      </TouchableOpacity>
      <View style={{ margin: 3 }} />
      <TouchableOpacity
        style={[styles.icon, pathType === 'dashed' && styles.active]}
        onPress={() => setPathType('dashed')}
      >
        <BrushDashedIcon fill='#FFF' height={28} width={28} />
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 100
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
