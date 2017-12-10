import {
  UPDATE_PROFILES_TABLE,
  REQUEST_PROFILES,
  RECEIVE_PROFILES,
  SELECT_CARD,
  SHOW_MORE,
} from './actions';

const filterArrBySubstr = (arr = [], subStr, excludedProps, limit) => {
  if (subStr === '') {
    return arr.filter((item, index) => index < limit);
  }

  const filteredItemsCount = arr.filter((i, index) => {
    const curObj = Object.entries(i);
    const isMatchedCount = curObj.filter((ii) => {
      const propName = ii[0];
      if (excludedProps.includes(propName)) {
        return false;
      }
      const propValue = ii[1].toLowerCase();
      return propValue.includes(subStr.toLowerCase());
    });
    return isMatchedCount.length > 0 && index < limit;
  });

  // return filteredItemsCount.filter((item, index) => index < limit);
  return filteredItemsCount;
};

const rootReducer = (
  state = {
    isFetching: false,
    cacheLimit: 100,
    initCacheLimit: 100,
    profiles: [],
    initProfiles: [],
    searchQuery: '',
    searchResult: [],
    showPerPage: 25,
    showedCards: 25,
    isRestToShow: false,
    searchCache: {},
    selectedCards: [],
    excludedInSearch: ['avatar', 'id'],
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_PROFILES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PROFILES: {
      const initialProfilesList = action.profiles.filter((item, index) => index < state.cacheLimit);
      return {
        ...state,
        isFetching: false,
        profiles: action.profiles,
        searchResult: initialProfilesList,
        initProfiles: initialProfilesList,
        isRestToShow: initialProfilesList.length > state.showPerPage,
      };
    }
    case UPDATE_PROFILES_TABLE: {
      if (state.searchCache[action.searchQuery] !== undefined) {
        return {
          ...state,
          searchQuery: action.searchQuery,
          searchResult: state.searchCache[action.searchQuery],
          showedCards: state.showPerPage,
          cacheLimit: state.initCacheLimit,
          isRestToShow: state.searchCache[action.searchQuery].length > state.showPerPage,
        };
      }

      if(action.searchQuery === '') {
        return {
          ...state,
          searchQuery: action.searchQuery,
          searchResult: state.initProfiles,
          showedCards: state.showPerPage,
          cacheLimit: state.initCacheLimit,
          isRestToShow: state.initProfiles.length > state.showPerPage,
        }
      }

      const filteredProfiles = filterArrBySubstr(
        state.profiles,
        action.searchQuery,
        state.excludedInSearch,
        state.cacheLimit,
      );

      return {
        ...state,
        searchQuery: action.searchQuery,
        searchResult: filteredProfiles,
        showedCards: state.showPerPage,
        cacheLimit: state.initCacheLimit,
        searchCache: {
          ...state.searchCache,
          [action.searchQuery]: filteredProfiles,
        },
        isRestToShow: filteredProfiles.length > state.showPerPage,
      };
    }
    case SELECT_CARD: {
      const isSelected = state.selectedCards.includes(action.cardId);
      return {
        ...state,
        selectedCards: isSelected ? state.selectedCards.filter(i => i !== action.cardId)
          : state.selectedCards.concat(action.cardId),
      };
    }
    case SHOW_MORE: {
      const newShowedCards = state.showedCards + state.showPerPage;

      if (newShowedCards > state.cacheLimit) {
        const newCacheLimit = state.cacheLimit + state.initCacheLimit;
        const filteredProfiles = filterArrBySubstr(
          state.profiles,
          state.searchQuery,
          state.excludedInSearch,
          newCacheLimit,
        );

        return {
          ...state,
          cacheLimit: newCacheLimit,
          searchResult: filteredProfiles,
          showedCards: newShowedCards,
          isRestToShow: filteredProfiles.length > state.showPerPage,
        };
      }

      return {
        ...state,
        showedCards: newShowedCards,
        isRestToShow: state.searchResult.length > (state.showPerPage + state.showedCards),
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
