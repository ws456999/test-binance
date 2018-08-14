import { HomeState, initalState } from './state'
import * as TYPES from './types'
import { actionType } from './actions'

export function reducer(
  state: HomeState = initalState,
  action: actionType
): HomeState {
  let newState = { ...state }
  switch (action.type) {
    case TYPES.COUNT_ADD:
      newState.count++
      break
    default:
      return state
  }
  return newState
}
