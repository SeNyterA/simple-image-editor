import {
  Canvas,
  Group,
  Image,
  rect,
  rrect,
  SkRect,
  useImage,
} from '@shopify/react-native-skia';
import React, {useState} from 'react';
import {Dimensions, SafeAreaView, StatusBar, View} from 'react-native';
import DrawProvider from './contexts/DrawProvider';
import TextEditor from './TextEditor';
import ToolBottom from './ToolBottom';
import ToolHeader from './ToolHeader';

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
        width: canvasW,
        height: canvasW * (imgH / imgW),
        x: 0,
        y: 0,
      };
    } else {
      rect = {
        width: canvasH * (imgW / imgH),
        height: canvasH,
        x: 0,
        y: 0,
      };
    }
  }
  return rect;
};

export default function EditorScreen() {
  const [canvasSize, setCanvasSize] = useState({
    width: width,
    height: height - 50,
  });

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
    <SafeAreaView style={[{flex: 1, backgroundColor: '#000000'}]}>
      <StatusBar barStyle="light-content" />

      <DrawProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: '#111',
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <ToolHeader />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onLayout={event => {
              var {x, y, width, height} = event.nativeEvent.layout;
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
                  clip={rrect(
                    rect(0, 0, imgRect.width, imgRect.height),
                    10,
                    10,
                  )}>
                  {!!image && (
                    <Image image={image} fit="contain" {...imgRect} />
                  )}
                </Group>
              </Canvas>
            )}
          </View>
          <ToolBottom />
        </View>

        <TextEditor />
      </DrawProvider>
    </SafeAreaView>
  );
}
