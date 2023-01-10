import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDrawContext} from './contexts/DrawProvider';

export default function ToolBottom() {
  const drawContext = useDrawContext();
  const [size, setSize] = useState<number>(1);

  useEffect(() => {
    const unsubscribeDraw = drawContext?.addListener(state => {
      setSize(state.size);
    });
    return () => {
      unsubscribeDraw();
    };
  }, [drawContext]);

  return (
    <View style={{height: 60, padding: 10}}>
      <TouchableOpacity
        style={{width: 40, height: 40, backgroundColor: '#fff'}}
        onPress={() => drawContext?.commands?.setSize(size + 1)}>
        <Text>{size}</Text>
      </TouchableOpacity>
    </View>
  );
}
