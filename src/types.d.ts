
export interface State {
  fromText: string
  result: string
}

export type Action =
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }

