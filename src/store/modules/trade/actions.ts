import * as TYPES from './types'
import { action } from 'typesafe-actions'
import { CoinListState, CoinChangeState } from './state'

// CLASSIC API
export const add = (payload: number) => action(TYPES.ADD, payload)
export const increment = () => action(TYPES.INCREMENT)
export const initailCoinList = (payload: CoinListState[]) => action(TYPES.INITIAL_COIN_LIST, payload)
export const changeCoinList = (payload: CoinChangeState[]) => action(TYPES.CHANGE_COIN_LIST, payload)
