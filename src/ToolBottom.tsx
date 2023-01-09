import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDrawContext} from './contexts/DrawProvider';

export default function ToolBottom() {
  const {
    state: {color, size, menu},
    commands,
  } = useDrawContext();

  return (
    <View style={{height: 60, padding: 10}}>
      <TouchableOpacity
        style={{width: 40, height: 40, backgroundColor: '#fff'}}
        onPress={() => commands?.setSize(size + 1)}>
        <Text>{size}</Text>
      </TouchableOpacity>
    </View>
  );
}
