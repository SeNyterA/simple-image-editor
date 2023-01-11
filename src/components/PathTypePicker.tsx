import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
  View
} from 'react-native'
import { BrushDashedIcon, BrushStrokeIcon } from '../assets'

export default function PathTypePicker() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity>
        <BrushStrokeIcon fill='#FFF' height={28} width={28} />
      </TouchableOpacity>
      <TouchableOpacity>
        <BrushDashedIcon fill='#FFF' height={28} width={28} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30
  },
  red: {
    color: 'red'
  }
})
