import React from 'react'
import EditorScreen from './src/EditorScreen'

const App = () => {
  return (
    <EditorScreen
      exportFn={data => console.log(data)}
      goBackFn={() => {
        console.log('goback')
      }}
      defaultState={{
        editURL:
          'https://cdn.discordapp.com/attachments/824562218414243851/1082716690871222282/IMG_3647.png'
      }}
    />
  )
}

export default App
