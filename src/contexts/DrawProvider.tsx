import { Color } from '@shopify/react-native-skia'
import React, { createContext, useContext, useMemo } from 'react'
import { Dimensions } from 'react-native'

import { DrawingElement, PathType, TextElement } from './type'

export type ActionMemu = 'drawing' | 'addText' | 'editText' | 'default'

export type ToolbarMode = 'takePhoto' | 'edit'

export type CanvasSizeType = {
  width: number
  height: number
}

export type DrawboardState = {
  tmpURL: string | undefined
  editURL: string | undefined
  mode: ToolbarMode
  action: ActionMemu
  elements: DrawingElement[]
  editTextElementId?: string
  color: Color
  size: number
  pathType: PathType
  canvasSize: CanvasSizeType
}

export type DrawboardCommands = {
  getState: <T>(cb: (state: DrawboardState) => T) => T
  setState: (newState: Partial<DrawboardState>) => void
  notify: () => void
  selectItem: (index: number) => void
  deleteSelectedItem: () => void
  addElement: (e: DrawingElement) => void
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

const createDrawProviderValue = (
  defaultValue?: Partial<DrawboardState>
): DrawboardContextType => {
  const state: DrawboardState = {
    tmpURL: undefined,
    editURL: undefined,
    action: 'drawing',
    mode: 'takePhoto',
    elements: [],
    pathType: 'normal',
    size: 4,
    color: '#000',
    canvasSize: {
      width: width,
      height: height - 50
    },
    ...defaultValue
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
    getState: cb => cb(state),
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
    },

    addElement: e => {
      state.elements = [...state.elements, e]
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

export const useDrawProvider = (defaultValue?: Partial<DrawboardState>) => {
  const drawContext = useMemo(() => createDrawProviderValue(defaultValue), [])

  return ({ children }: { children: React.ReactNode }) => (
    <DrawContext.Provider value={drawContext}>{children}</DrawContext.Provider>
  )
}
