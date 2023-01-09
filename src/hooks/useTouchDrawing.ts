import {
  Skia,
  SkPoint,
  TouchInfo,
  useTouchHandler,
} from '@shopify/react-native-skia';
import {useRef} from 'react';
import {DrawingElement, PathType} from '../contexts/type';
import {useDrawContext} from './../contexts/DrawProvider';

export const createPath = (
  x: number,
  y: number,
  color: number,
  size: number,
  pathType: PathType,
): DrawingElement => {
  const path = Skia.Path.Make();
  path.moveTo(x, y);
  return {
    type: 'path',
    path,
    color,
    size,
    pathType,
  };
};

export const useTouchDrawing = () => {
  const prevPointRef = useRef<SkPoint>();

  const {
    state: {menu, color, size, pathType, elements},
    commands,
  } = useDrawContext();

  return useTouchHandler({
    onStart: ({x, y}) => {
      switch (menu) {
        case undefined:
        case 'drawing':
        case 'chooseSticker':
        case 'colors': {
          commands?.addElement(createPath(x, y, color, size, pathType));
          break;
        }

        default:
          break;
      }
      prevPointRef.current = {x, y};
    },
    onActive: ({x, y}) => {
      switch (menu) {
        case undefined:
        case 'drawing':
        case 'chooseSticker':
        case 'colors': {
          console.log('elements', elements.length);
          const element = commands?.getElement(elements.length - 1);
          const xMid = (prevPointRef.current!.x + x) / 2;
          const yMid = (prevPointRef.current!.y + y) / 2;
          element?.path.quadTo(
            prevPointRef.current!.x,
            prevPointRef.current!.y,
            xMid,
            yMid,
          );
          break;
        }

        default:
          break;
      }
      prevPointRef.current = {x, y};
    },
    onEnd: () => {},
  });
};
