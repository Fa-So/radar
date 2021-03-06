import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import radar from './reducers'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash.throttle'

const configureStore = () => {
  const middlewares = [thunk]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  const store = createStore(
    radar,
    loadState(),
    applyMiddleware(...middlewares)
  )
  store.subscribe(throttle(() => {
    const state = {
      settings: store.getState().settings
    }
    console.log('save', state)
    saveState(state)
  }, 1000))
  return store
}

export default configureStore
