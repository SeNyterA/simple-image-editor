import {
  Canvas,
  Fill,
  Group,
  Image,
  rect,
  rrect,
  SkRect,
  useImage,
} from '@shopify/react-native-skia';
import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width, height} = Dimensions.get('window');

const getRectImage = ({
  imgW,
  imgH,
  canvasW,
  canvasH,
}: {
  imgW?: number;
  imgH?: number;
  canvasW?: number;
  canvasH?: number;
}) => {
  let rect: SkRect | undefined = undefined;
  if (imgW && imgH && canvasW && canvasH) {
    if (imgW / canvasW > imgH / canvasH) {
      rect = {
        width: canvasW - 10,
        height: (canvasW - 10) * (imgH / imgW),
        x: 0,
        y: 0,
      };
    } else {
      rect = {
        width: (canvasH - 10) * (imgW / imgH),
        height: canvasH - 10,
        x: 0,
        y: 0,
      };
    }
  }
  return rect;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [canvasSize, setCanvasSize] = useState({
    width: width,
    height: height - 50,
  });
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const image = useImage(
    'https://cdn.discordapp.com/attachments/824562218414243851/1061832691596677201/IMG_2512.jpg',
  );

  const imgRect = getRectImage({
    canvasH: canvasSize.height,
    canvasW: canvasSize.width,
    imgH: image?.height(),
    imgW: image?.width(),
  });

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1, backgroundColor: '#333'}]}>
      <StatusBar
        barStyle="light-content"
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{height: 40, backgroundColor: '#333'}}></View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onLayout={event => {
          var {x, y, width, height} = event.nativeEvent.layout;
          console.log(x, y, width, height);
          setCanvasSize({
            width,
            height,
          });
        }}>
        {!!imgRect && (
          <Canvas
            style={{
              ...imgRect,
            }}>
            <Group
              clip={rrect(rect(0, 0, imgRect.width, imgRect.height), 10, 10)}>
              {!!image && <Image image={image} fit="contain" {...imgRect} />}
            </Group>
          </Canvas>
        )}
      </View>

      <View style={{height: 40, backgroundColor: '#333'}}></View>
    </SafeAreaView>
  );
};

export default App;
