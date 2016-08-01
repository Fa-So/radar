import * as connectionTypes from '../constants/ConnectionTypes'

let connecting = false

const connection = (state = {isConnected: false}, action) => {
  switch (action.type) {
    case connectionTypes.CONNECT_REQUEST:
      connecting = true
      return {
        isConnected: false,
        url: action.url,
        user: action.user,
        password: action.password
      }
    case connectionTypes.CONNECT_SUCCESS:
      connecting = false
      return {
        ...state,
        isConnected: true
      }
    case connectionTypes.CONNECT_FAILURE:
      connecting = false
      return {
        isConnected: false,
        url: action.url,
        error: action.message
      }
    default:
      return state
  }
}

export const getIsConnecting = () => connecting

export default connection
