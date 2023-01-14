import React, { createContext, useContext, useMemo } from 'react'
import { Dimensions } from 'react-native'

import { DrawingElement, PathType } from './type'

export type ToobarMemu =
  | 'drawing'
  | 'chooseSticker'
  | 'selection'
  | 'colors'
  | 'text'
  | 'save'
  | 'delete'
  | 'addText'
  | 'editText'

export type ToolbarMode = 'export' | 'edit'

export type CanvasSizeType = {
  width: number
  height: number
}

export type DrawboardState = {
  mode: ToolbarMode
  menu: ToobarMemu
  elements: DrawingElement[]
  textElements: DrawingElement[]
  selectedElement: DrawingElement | undefined
  color: any
  size: number
  backgroundColor?: any
  pathType: PathType
  canvasSize: CanvasSizeType
}

export type DrawboardCommands = {
  setMenu: (menu: ToobarMemu) => void
  setElements: (elements: DrawingElement[]) => void
  setColor: (color: any) => void
  setSize: (size: number) => void
  setMode: (mode: ToolbarMode) => void
  setPathType: (pathType: PathType) => void
  setBackgroundColor: (backgroundColor?: any) => void
  setSelectedElement: (selectedElement: DrawingElement | undefined) => void
  addElement: (element: DrawingElement) => void
  removeElement: (index: number) => void
  addTextElement: (elements: DrawingElement) => void
  setCanvasSize: (canvasSize: CanvasSizeType) => void
}

export type DrawboardContextType = {
  commands: DrawboardCommands
  state: DrawboardState
  addListener: (listener: (state: DrawboardState) => void) => () => void
}

const DrawContext = createContext<DrawboardContextType | undefined>(undefined)

const { width, height } = Dimensions.get('window')
const createDrawProviderValue = (): DrawboardContextType => {
  const state: DrawboardState = {
    menu: 'drawing',
    mode: 'edit',
    elements: [],
    selectedElement: undefined,
    pathType: 'normal',
    size: 4,
    color: '#fff',
    backgroundColor: '#000',
    textElements: [],
    canvasSize: {
      width: width,
      height: height - 50
    }
  }

  const listeners = [] as ((state: DrawboardState) => void)[]
  const notifyListeners = (s: DrawboardState) => listeners.forEach(l => l(s))

  const commands: DrawboardCommands = {
    setMenu: (menu: ToobarMemu) => {
      state.menu = menu
      notifyListeners(state)
    },
    setElements: (elements: DrawingElement[]) => {
      state.elements = elements
      notifyListeners(state)
    },
    addElement: (element: DrawingElement) => {
      state.elements = [...state.elements, element]
      notifyListeners(state)
    },
    setColor: (color: any) => {
      state.color = color
      notifyListeners(state)
    },
    setSize: (size: number) => {
      state.size = size
      notifyListeners(state)
    },
    setPathType: (pathType: PathType) => {
      state.pathType = pathType
      notifyListeners(state)
    },
    setBackgroundColor: (color: any) => {
      state.backgroundColor = color
      notifyListeners(state)
    },
    setSelectedElement: (element?: DrawingElement | undefined) => {
      state.selectedElement = element
      notifyListeners(state)
    },
    removeElement: index => {
      state.elements.pop()
      notifyListeners(state)
    },
    addTextElement: (element: DrawingElement) => {
      state.textElements = [...state.textElements, element]
      notifyListeners(state)
    },
    setMode: (mode: ToolbarMode) => {
      state.mode = mode
      notifyListeners(state)
    },
    setCanvasSize: canvasSize => {
      state.canvasSize = canvasSize
      notifyListeners(state)
    }
  }

  return {
    commands,
    state,
    addListener: (cb: (state: DrawboardState) => void) => {
      listeners.push(cb)
      return () => listeners.splice(listeners.indexOf(cb), 1)
    }
  }
}

export const useDrawContext = () => {
  const drawContext = useContext(DrawContext)
  if (drawContext === null) {
    throw Error('Ux Context missing')
  }
  return drawContext!
}

export const useDrawProvider = () => {
  const drawContext = useMemo(() => createDrawProviderValue(), [])

  return ({ children }: { children: React.ReactNode }) => (
    <DrawContext.Provider value={drawContext}>{children}</DrawContext.Provider>
  )
}
