import {
  UPDATE_PROFILES_TABLE,
  REQUEST_PROFILES,
  RECEIVE_PROFILES,
  SELECT_CARD,
} from './actions';

const filterProfiles = (state = [], searchQuery, excludeInSearch) => {
  const findedProfiles = state.filter((card) => {
    const profileCard = Object.entries(card);
    const isMatched = profileCard.filter((userInfo) => {
      const key = userInfo[0];
      if (excludeInSearch.includes(key)) {
        return false;
      }
      const value = userInfo[1].toLowerCase();
      return value.includes(searchQuery.toLowerCase());
    });
    return isMatched.length > 0;
  });
  return findedProfiles;
};

const rootReducer = (
  state = {
    searchQuery: '',
    isFetching: true,
    fetchStart: null,
    fetchEnd: null,
    profiles: [],
    currentSearchResult: [],
    selectedCards: [],
    excludeInSearch: ['avatar', 'id'],
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_PROFILES:
      return {
        ...state,
        fetchStart: action.fetchStart,
      };
    case RECEIVE_PROFILES: {
      const profilesWithId = action.profiles.map((item, index) => {
        return {
          ...item,
          id: index,
        };
      });
      return {
        ...state,
        isFetching: false,
        fetchEnd: action.fetchEnd,
        profiles: profilesWithId,
        currentSearchResult: profilesWithId,
      };
    }
    case UPDATE_PROFILES_TABLE:
      return {
        ...state,
        searchQuery: action.searchQuery,
        currentSearchResult: filterProfiles(
          state.profiles,
          action.searchQuery,
          state.excludeInSearch,
        ),
      };
    case SELECT_CARD: {
      const isSelected = state.selectedCards.includes(state.profiles[action.cardId]);
      return {
        ...state,
        selectedCards: isSelected ? state.selectedCards.filter(i => i.id !== action.cardId)
          : state.selectedCards.concat(state.profiles[action.cardId]),
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
