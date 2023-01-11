import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import EditorScreen from './src/EditorScreen'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <EditorScreen />
    </GestureHandlerRootView>
  )
}

export default App
