import React from 'react'
import Share, { ShareOptions } from 'react-native-share'
import EditorScreen from './src/EditorScreen'

const App = () => {
  const share = async (url: string) => {
    console.log(url.slice(0, 100))
    if (url) {
      const shareOptions: ShareOptions = {
        title: 'Sharing image from awesome drawing app',
        message: 'Output Image',
        url,
        failOnCancel: false
      }
      await Share.open(shareOptions)
    }
  }
  return (
    <EditorScreen
      exportFn={share}
      goBackFn={() => {
        console.log('goback')
      }}
      defaultState={
        {
          // editURL:
          //   'https://cdn.discordapp.com/attachments/824562218414243851/1082716690871222282/IMG_3647.png'
        }
      }
    />
  )
}

export default App
