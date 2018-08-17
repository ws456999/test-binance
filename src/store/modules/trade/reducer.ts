// import { HomeState, initalState } from './state'
import * as TYPES from './types'
import { ActionType } from 'typesafe-actions'
import * as counters from './actions'
import { CoinListState, CoinChangeState } from './state'
import { combineReducers } from 'redux'

export type CountersAction = ActionType<typeof counters>

export type CountersState = {
  readonly reduxCounter: number
  readonly coinList: CoinListState[]
}

export default combineReducers<CountersState, CountersAction>({
  // 测试redux
  reduxCounter: (state = 0, action: CountersAction): number => {
    switch (action.type) {
      case TYPES.INCREMENT:
        return state + 1
      case TYPES.ADD:
        return state + (action as any).payload
      default:
        return state
    }
  },

  coinList: (state = [], action: CountersAction): any => {
    switch (action.type) {
      case TYPES.INITIAL_COIN_LIST:
        return (action as any).payload
      case TYPES.CHANGE_COIN_LIST:
        return changeList(state, (action as any).payload)
      default:
        return state
    }
  },
})

function changeList(arr: CoinListState[], patch: CoinChangeState[]): CoinListState[] {
  patch.forEach(v => {
    let o = arr.find(item => item.symbol === v.s) || {}
    o.lastPrice = v.c
    o.highPrice = v.h
    o.lowPrice = v.l
    o.lastPrice = v.o
    o.volume = v.v
    o.quoteVolume = v.q
  })
  return [...arr]
}
