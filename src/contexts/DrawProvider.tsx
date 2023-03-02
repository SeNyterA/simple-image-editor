import { Color } from '@shopify/react-native-skia'
import React, { createContext, useContext, useMemo } from 'react'
import { Dimensions } from 'react-native'

import { DrawingElement, PathType } from './type'

export type ToobarMemu = 'drawing' | 'addText' | 'editText' | 'default'

export type ToolbarMode = 'export' | 'edit'

export type CanvasSizeType = {
  width: number
  height: number
}

export type DrawboardState = {
  baseURL: string | undefined
  mode: ToolbarMode
  menu: ToobarMemu
  elements: DrawingElement[]
  selectedElement: DrawingElement | undefined
  color: Color
  size: number
  backgroundColor: Color | undefined
  pathType: PathType
  canvasSize: CanvasSizeType
}

export type DrawboardCommands = {
  getState: () => DrawboardState
  setState: (newState: Partial<DrawboardState>) => void
  notify: () => void
  selectItem: (index: number) => void
  deleteSelectedItem: () => void
}

export type DrawboardContextType = {
  commands: DrawboardCommands
  state: DrawboardState
  addListener: (listener: (state: DrawboardState) => void) => () => void
}

export const DrawContext = createContext<DrawboardContextType | undefined>(
  undefined
)

const { width, height } = Dimensions.get('window')
const createDrawProviderValue = (): DrawboardContextType => {
  const state: DrawboardState = {
    baseURL: undefined,
    menu: 'drawing',
    mode: 'edit',
    elements: [],
    selectedElement: undefined,
    pathType: 'normal',
    size: 4,
    color: '#fff',
    backgroundColor: '#000',
    canvasSize: {
      width: width,
      height: height - 50
    }
  }

  const listeners = [] as ((state: DrawboardState) => void)[]
  const notifyListeners = (s: DrawboardState) => listeners.forEach(l => l(s))

  const commands: DrawboardCommands = {
    setState: (newState: Partial<DrawboardState>) => {
      const keys = Object.keys(newState) as (keyof DrawboardState)[]
      keys.forEach(e => (state[e] = newState[e]))
      notifyListeners(state)
    },
    notify: () => {
      notifyListeners(state)
    },
    getState: () => state,
    selectItem: (index: number) => {
      state.elements = state.elements.map((e, idx) =>
        idx === index
          ? {
              ...e,
              selected: !e.selected
            }
          : e
      )
      notifyListeners(state)
    },
    deleteSelectedItem: () => {
      state.elements = state.elements.filter((e, idx) => !e.selected)
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
