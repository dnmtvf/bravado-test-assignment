import { combineReducers } from 'redux'
import {
  UPDATE_PROFILES_TABLE,
  REQUEST_PROFILES,
  RECEIVE_PROFILES,
  SELECT_CARD
} from './actions'


// address
// avatar
// city
// email
// name
// title

const filterProfiles = (state = [], filterQuery, excludeInSearch) => {
  const filteredProfiles = state.filter(
    item => {
      const profileCredentials = Object.entries(item);
      const filteredCredentials = profileCredentials.filter(i => {
        const key = i[0];
        
        if(excludeInSearch.includes(key)) {
            return false;
        }
        
        
        const value = i[1].toLowerCase();
        return value.includes(filterQuery.toLowerCase());
        }
      )
        return filteredCredentials.length;
    }
  )
  
  return filteredProfiles.filter((item, index) => index <= 100);
}


const rootReducer = (
  state = {
    searchQuery: '',
    isFetching: true,
    fetchStart: null,
    fetchEnd: null,
    profiles: [],
    currentSearchResult: [],
    selectedCards: [],
    excludeInSearch: ['avatar', 'id']
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
          // profiles: action.profiles,
          profiles: action.profiles.map((item, index) => {
            return {...item, id: index}
          }),
          currentSearchResult: action.profiles.filter((item, index) => index <= 100)
        }
      case UPDATE_PROFILES_TABLE:
        return {
          ...state,
          searchQuery: action.searchQuery,
          currentSearchResult: filterProfiles(state.profiles, action.searchQuery, state.excludeInSearch)
        }
      case SELECT_CARD:
        return {
          ...state,
          selectedCards: state.selectedCards.includes(state.profiles[action.cardId]) ?
          state.selectedCards.filter(i => i.id != action.cardId)
          : state.selectedCards.concat(state.profiles[action.cardId]) 
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