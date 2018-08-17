import { StateType, ActionType } from 'typesafe-actions'
import { RouterAction, LocationChangeAction } from 'react-router-redux'
type ReactRouterAction = RouterAction | LocationChangeAction
import * as counters from './modules/trade/actions'
import { rootReducer } from './'
export type CountersAction = ActionType<typeof counters>

declare module 'Types' {
  export type RootState = StateType<typeof rootReducer>
  export type RootAction = ReactRouterAction | CountersAction
}
