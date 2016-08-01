import * as fetcherTypes from '../constants/FetcherTypes'

let changing = false

const fetcher = (state = {}, action) => {
  switch (action.type) {
    case fetcherTypes.FETCHER_REQUEST:
      changing = true
      return {
        expression: action.fetchExpression
      }
    case fetcherTypes.FETCHER_SUCCESS:
      changing = false
      return state
    case fetcherTypes.FETCHER_FAILURE:
      changing = false
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export const getIsChanging = () => changing

export default fetcher
