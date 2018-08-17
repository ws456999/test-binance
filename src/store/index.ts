import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import tradeReducer from './modules/trade/reducer'

// action 允许异步
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  // 添加中间件
  middleware.push(createLogger() as any)
}

// 启用redux-devtools
const composeEnhancers =
  window && typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'
    ? __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middleware))

export const rootReducer = combineReducers({
  trade: tradeReducer,
  router: routerReducer
})

const store = createStore(rootReducer, enhancer)
// console.log(store.getState())

export default store
