import { getIsChangingFetcher, getIsSettingState, getIsConnecting } from '../reducers'
import * as api from '../api'
import * as connectionTypes from '../constants/ConnectionTypes'
import * as fetcherTypes from '../constants/FetcherTypes'
import * as stateTypes from '../constants/StateTypes'

export const connect = ({url, user, password}) => (dispatch) => {
  if (getIsConnecting(url)) {
    return Promise.resolve()
  }

  dispatch({type: connectionTypes.CONNECT_REQUEST, url, user, password})

  return api.connect(url, user, password).then(
    (response) => {
      dispatch({type: connectionTypes.CONNECT_SUCCESS, url, user, password})
    },
    (error) => {
      const message = error.message || 'Something went wrong'
      dispatch({type: connectionTypes.CONNECT_FAILURE, url, user, message})
    })
}

export const changeFetcher = (fetchExpression) => (dispatch) => {
  if (getIsChangingFetcher()) {
    return Promise.resolve()
  }

  dispatch({type: fetcherTypes.FETCHER_REQUEST, fetchExpression})

  const onStatesDidChange = (states) => {
    dispatch({type: stateTypes.STATE_CHANGE, states})
  }

  return api.changeFetcher(fetchExpression, onStatesDidChange).then(
    (response) => {
      dispatch({type: fetcherTypes.FETCHER_SUCCESS, fetchExpression})
    },
    (error) => {
      const message = error.message || 'Something went wrong'
      dispatch({type: fetcherTypes.FETCHER_FAILURE, fetchExpression, message})
    })
}

export const setState = (path, value) => (dispatch) => {
  if (getIsSettingState(path)) {
    return Promise.resolve()
  }

  dispatch({type: stateTypes.STATE_SET_REQUEST, path, value})

  return api.setState(path, value).then(
    (response) => {
      dispatch({type: stateTypes.STATE_SET_SUCCESS, path, value})
    },
    (error) => {
      const message = error.message || 'Something went wrong'
      dispatch({type: stateTypes.STATE_SET_FAILURE, path, message})
    })
}
