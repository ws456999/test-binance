import * as TYPES from './types'

export interface CountAdd {
  type: TYPES.COUNT_ADD
}

export const actions = {
  add_count(): CountAdd {
    return {
      type: TYPES.COUNT_ADD
    }
  }
}

export type actionType = CountAdd
