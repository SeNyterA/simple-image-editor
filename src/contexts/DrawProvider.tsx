import React, { createContext, useContext, useMemo } from 'react'

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

export type DrawboardState = {
  menu: ToobarMemu
  elements: DrawingElement[]
  selectedElement: DrawingElement | undefined
  color: any
  size: number
  backgroundColor?: any
  pathType: PathType
}

export type DrawboardCommands = {
  setMenu: (menu: ToobarMemu) => void
  setElements: (elements: DrawingElement[]) => void
  setColor: (color: any) => void
  setSize: (size: number) => void
  setPathType: (pathType: PathType) => void
  setBackgroundColor: (backgroundColor?: any) => void
  setSelectedElement: (selectedElement: DrawingElement | undefined) => void
  addElement: (element: DrawingElement) => void
}

export type DrawboardContextType = {
  commands: DrawboardCommands
  state: DrawboardState
  addListener: (listener: (state: DrawboardState) => void) => () => void
}

const DrawContext = createContext<DrawboardContextType | undefined>(undefined)

const createDrawProviderValue = (): DrawboardContextType => {
  const state: DrawboardState = {
    menu: 'drawing',
    elements: [],
    selectedElement: undefined,
    pathType: 'normal',
    size: 6,
    color: '#fff',
    backgroundColor: '#000'
  }

  const listeners = [] as ((state: DrawboardState) => void)[]
  const notifyListeners = (s: DrawboardState) => listeners.forEach(l => l(s))

  const commands = {
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
