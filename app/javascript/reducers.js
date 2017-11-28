import { combineReducers } from 'redux'
import {
  UPDATE_PROFILES_TABLE,
  REQUEST_PROFILES,
  RECEIVE_PROFILES
} from './actions'

const rootReducer = (
  state = {
    searchString: '',
    isFetching: true,
    fetchStart: null,
    fetchEnd: null,
    profiles: []
  },
  action
) => {
  switch (action.type) {
    case REQUEST_PROFILES:
      return {
        ...state,
        fetchStart: action.fetchStart
      }
    case RECEIVE_PROFILES:
        return {
          ...state,
          isFetching: false,
          fetchEnd: action.fetchEnd,
          profiles: action.profiles
        }
      default:
        return state    
  }
}

// const rootReducer = combineReducers({
//   fetchProfiles,
  // receiveProfiles
// })

export default rootReducer;
// export default fetchProfiles;