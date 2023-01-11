import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

const colors = [
  '#FFF',
  '#000',
  '#0FFA',
  '#0F0A',
  '#FF0',
  '#ffa200',
  '#fe5f9f',
  '#ff0000',

  '#FFF',
  '#000',
  '#0FFA',
  '#0F0A',
  '#FF0',
  '#ffa200',
  '#fe5f9f',
  '#ff0000',

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
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            // className='h-8 w-8 rounded-full mr-1 p-[2px] bg-slate-200'
            style={{
              width: 32,
              height: 32,
              borderRadius: 32,
              marginRight: 4,
              padding: 2
            }}
          >
            <View
              //   className='rounded-full w-full h-full'
              style={{
                backgroundColor: color,
                width: '100%',
                height: '100%',
                borderRadius: 100
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
