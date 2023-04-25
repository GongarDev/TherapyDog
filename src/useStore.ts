import { useReducer } from 'react'
import { type Action, type State } from './types'

const initialState: State = {
  fromText: '',
  result: '',
}

function reducer (state: State, action: Action) {
  const { type } = action

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export function useStore () {

  const [{
    fromText,
    result,
  }, dispatch] = useReducer(reducer, initialState)

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromText,
    result,
    setFromText,
    setResult
  }
}
