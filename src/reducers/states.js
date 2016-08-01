import * as fetcherTypes from '../constants/FetcherTypes'
import * as stateTypes from '../constants/StateTypes'
import * as connectionTypes from '../constants/ConnectionTypes'

let changing = {}

const states = (state = {}, action) => {
  switch (action.type) {
    case fetcherTypes.FETCHER_FAILURE:
    case connectionTypes.CONNECT_REQUEST:
      return []
    case stateTypes.STATE_CHANGE:
      return action.states.filter((state) => {
        return typeof state.value !== 'undefined'
      })
    case stateTypes.STATE_SET_REQUEST:
      changing[action.path] = true
      return state
    case stateTypes.STATE_SET_SUCCESS:
    case stateTypes.STATE_SET_FAILURE:
      delete changing[action.path]
      return state
    default:
      return state
  }
}

export default states

export const getIsSetting = (path) => changing[path]
