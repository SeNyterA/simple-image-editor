import {SkImage, SkPath, SkRect} from '@shopify/react-native-skia';

export type DrawingElementType = 'path' | 'image';

export type PathType = 'normal' | 'dashed' | 'discreted';

export type DrawingElement = {
  type: DrawingElementType;
  path: SkPath;
} & (
  | {
      type: 'path';
      pathType: PathType;
      path: SkPath;
      color: number;
      size: number;
    }
  | {type: 'image'; path: SkPath; image: SkImage}
);

export type DrawCommands = {
  setColor: (color: any) => void;
  setBackgroundColor: (color: any) => void;
  addElement: (element: DrawingElement) => void;
  deleteSelectedElements: () => void;
  deleteAllElements: () => void;
  setPathType: (type: PathType) => void;
  cleanUseless: () => Promise<void>;
  setSize: (size: number) => void;
};
