import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {DrawboardState, useDrawContext} from './contexts/DrawProvider';
import useWatchDrawing from './hooks/useWatchDrawing';

export default function ToolHeader() {
  const {addListener, commands} = useDrawContext();

  const size = useWatchDrawing((state: DrawboardState) => state.size);

  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
      }}>
      <TouchableOpacity onPress={() => commands?.setMenu('addText')}>
        <Text
          style={{
            color: '#fff',
            paddingHorizontal: 6,
            fontSize: 16,
            fontWeight: '600',
          }}>
          addText
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            paddingHorizontal: 6,
            fontSize: 16,
            fontWeight: '600',
          }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}
