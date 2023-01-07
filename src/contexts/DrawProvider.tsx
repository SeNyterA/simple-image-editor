import React, {createContext, ReactElement, useContext, useState} from 'react';

import {DrawingElement, PathType} from './type';

export type ToobarMemu =
  | 'drawing'
  | 'chooseSticker'
  | 'selection'
  | 'colors'
  | 'text'
  | 'save'
  | 'delete';

export type DrawboardState = {
  menu: ToobarMemu;
  elements: DrawingElement[];
  selectedElement: DrawingElement | undefined;
  color: any;
  size: number;
  backgroundColor?: any;
  pathType: PathType;
};

export type DrawboardContextType = {
  commands: any;
  state: DrawboardState;
};

const DrawContext = createContext<DrawboardContextType>({
  commands: [],
  state: {
    menu: 'drawing',
    elements: [],
    selectedElement: undefined,
    color: '#333',
    size: 2,
    pathType: 'normal',
    backgroundColor: '#fff',
  },
});

export default function DrawProvider({children}: {children: ReactElement}) {
  const [menu, setMenu] = useState<ToobarMemu>('drawing');
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [color, setColor] = useState<any>('#333');
  const [size, setSize] = useState<number>(2);
  const [pathType, setPathType] = useState<PathType>('normal');
  const [backgroundColor, setBackgroundColor] = useState<any>('#333');
  const [selectedElement, setSelectedElement] = useState<
    DrawingElement | undefined
  >();

  const commands = {
    setMenu: (menu: ToobarMemu) => setMenu(menu),
    toggleModal: (visible: boolean) => {},
  };

  return (
    <DrawContext.Provider
      value={{
        commands,
        state: {
          menu,
          elements,
          selectedElement,
          color,
          size,
          pathType,
          backgroundColor,
        },
      }}>
      {children}
    </DrawContext.Provider>
  );
}

export const useDrawContext = () => useContext(DrawContext);
