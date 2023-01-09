import React, {createContext, ReactElement, useContext, useState} from 'react';

import {DrawingElement, PathType} from './type';

export type ToobarMemu =
  | 'drawing'
  | 'chooseSticker'
  | 'selection'
  | 'colors'
  | 'text'
  | 'save'
  | 'delete'
  | 'addText'
  | 'editText';

export type DrawboardState = {
  menu: ToobarMemu;
  elements: DrawingElement[];
  selectedElement: DrawingElement | undefined;
  color: any;
  size: number;
  backgroundColor?: any;
  pathType: PathType;
};

export type DrawboardCommands = {
  setMenu: (menu: ToobarMemu) => void;
  setElements: (elements: DrawingElement[]) => void;
  setColor: (color: any) => void;
  setSize: (size: number) => void;
  setPathType: (pathType: PathType) => void;
  setBackgroundColor: (backgroundColor?: any) => void;
  setSelectedElement: (selectedElement: DrawingElement | undefined) => void;
  getElement: (index: number) => DrawingElement | undefined;
  addElement: (e: DrawingElement) => void;
};

export type DrawboardContextType = {
  commands?: DrawboardCommands;
  state: DrawboardState;
};

const DrawContext = createContext<DrawboardContextType>({
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

export default function DrawProvider({children}: {children: ReactElement[]}) {
  const [menu, setMenu] = useState<ToobarMemu>('drawing');
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [color, setColor] = useState<any>('#ffffff');
  const [size, setSize] = useState<number>(6);
  const [pathType, setPathType] = useState<PathType>('normal');
  const [backgroundColor, setBackgroundColor] = useState<any>('#333');
  const [selectedElement, setSelectedElement] = useState<
    DrawingElement | undefined
  >();

  const commands = {
    setMenu,
    setElements,
    setColor,
    setSize,
    setPathType,
    setBackgroundColor,
    setSelectedElement,
    getElement: (index: number) => elements[index] || undefined,
    addElement: (e: DrawingElement) =>
      setElements(elements => [...elements, e]),
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
