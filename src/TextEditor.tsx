import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {
  DrawboardState,
  ToobarMemu,
  useDrawContext,
} from './contexts/DrawProvider';
import useWatchDrawing from './hooks/useWatchDrawing';
import ToolBottom from './ToolBottom';

export default function TextEditor() {
  const {commands} = useDrawContext();

  const menu = useWatchDrawing(
    (state: DrawboardState) => state.menu,
  ) as ToobarMemu;

  const visible: ViewStyle =
    menu === 'addText'
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }
      : {
          width: 0,
          height: 0,
        };

  return (
    <View style={[visible, {justifyContent: 'center', alignItems: 'center'}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, width: '100%'}}>
        <TouchableWithoutFeedback onPress={() => commands?.setMenu('text')}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}
              onLayout={event => {
                var {x, y, width, height} = event.nativeEvent.layout;
                // console.log(x, y, width, height);
              }}>
              {menu === 'addText' && (
                <TextInput
                  multiline
                  autoFocus
                  defaultValue="Text"
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#fff',
                    textAlignVertical: 'center',
                    textAlign: 'center',
                  }}
                  onLayout={event => {
                    var {x, y, width, height} = event.nativeEvent.layout;
                    // console.log(x, y, width, height);
                  }}
                />
              )}
            </View>

            {menu === 'addText' && <ToolBottom />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
