import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDrawContext} from './contexts/DrawProvider';
import useTest from './hooks/useTest';

export default function ToolBottom() {
  const {
    state: {color, size, menu},
    commands,
  } = useDrawContext();

  const count = useTest();

  useEffect(() => {
    console.log('Render', count);
  }, [count]);

  return (
    <View style={{height: 60, padding: 10}}>
      <TouchableOpacity
        style={{width: 40, height: 40, backgroundColor: '#fff'}}
        onPress={() => commands?.setSize(size + 1)}>
        <Text>{size}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: 40, height: 40, backgroundColor: '#fff'}}
        onPress={() => commands?.setSize(size + 1)}>
        <Text>{count}</Text>
      </TouchableOpacity>
    </View>
  );
}
