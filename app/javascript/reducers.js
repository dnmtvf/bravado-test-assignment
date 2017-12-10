import {
  FIND_PROFILES,
  REQUEST_PROFILES,
  RECEIVE_PROFILES,
  SELECT_PROFILE,
  GET_NEXT_RESULT_PAGE,
} from './actions';

const filterArrBySubstr = (arr = [], subStr, excludedProps, limit) => {
  if (subStr === '') {
    return arr.filter((item, index) => index < limit);
  }

  const filteredItemsCount = arr.filter((i, index) => {
    const curObj = Object.entries(i);

    // const isMatchedCount = curObj.filter((ii) => {
    //   const propName = ii[0];
    //   if (excludedProps.includes(propName)) {
    //     return false;
    //   }
    //   const propValue = ii[1].toLowerCase();
    //   return propValue.includes(subStr.toLowerCase());
    // });

    // const isMatchedCount = curObj.reduce((acc, item) => {
    //   const propName = item[0];
    //   if (excludedProps.includes(propName)) {
    //     return acc;
    //   }
    //   const propValue = item[1].toLowerCase();
    //   return propValue.includes(subStr.toLowerCase()) ? acc + 1 : acc;
    // }, 0);

    const isMatched = curObj.reduce((acc, item) => {
      const propName = item[0];
      // const propValue = item[1].toLowerCase();
      const propValue = item[1];
      // console.log(propValue.toLowerCase().includes(subStr.toLowerCase()));
      if(!excludedProps.includes(propName) && propValue.toLowerCase().includes(subStr.toLowerCase())) {
        return true;
      }

      return acc || false;
    }, false);

    // return isMatchedCount.length > 0 && index < limit;
    // return isMatchedCount.length > 0 && index < limit;
    return isMatched && index < limit;
  });

  return filteredItemsCount;
};

const rootReducer = (
  state = {
    isFetching: false,
    cacheLimit: 100,
    defaultCacheLimit: 100,
    profiles: [],
    initialProfiles: [],
    searchQuery: '',
    searchResult: [],
    displayPerPage: 25,
    displayed: 25,
    isLeftToDisplay: false,
    searchCache: {},
    selectedProfiles: [],
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
      const initialProfiles = action.profiles.filter((item, index) => index < state.cacheLimit);
      return {
        ...state,
        isFetching: false,
        profiles: action.profiles,
        searchResult: initialProfiles,
        initialProfiles: initialProfiles,
        isLeftToDisplay: initialProfiles.length > state.displayPerPage,
      };
    }
    case FIND_PROFILES: {
      if (state.searchCache[action.searchQuery] !== undefined) {
        return {
          ...state,
          searchQuery: action.searchQuery,
          searchResult: state.searchCache[action.searchQuery],
          displayed: state.displayPerPage,
          cacheLimit: state.defaultCacheLimit,
          isLeftToDisplay: state.searchCache[action.searchQuery].length > state.displayPerPage,
        };
      }

      if(action.searchQuery === '') {
        return {
          ...state,
          searchQuery: action.searchQuery,
          searchResult: state.initialProfiles,
          displayed: state.displayPerPage,
          cacheLimit: state.defaultCacheLimit,
          isLeftToDisplay: state.initialProfiles.length > state.displayPerPage,
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
        displayed: state.displayPerPage,
        cacheLimit: state.defaultCacheLimit,
        searchCache: {
          ...state.searchCache,
          [action.searchQuery]: filteredProfiles,
        },
        isLeftToDisplay: filteredProfiles.length > state.displayPerPage,
      };
    }
    case SELECT_PROFILE: {
      const isSelected = state.selectedProfiles.includes(action.profileId);
      return {
        ...state,
        selectedProfiles: isSelected ? state.selectedProfiles.filter(i => i !== action.profileId)
          : state.selectedProfiles.concat(action.profileId),
      };
    }
    case GET_NEXT_RESULT_PAGE: {
      const newShowedCards = state.displayed + state.displayPerPage;

      if (newShowedCards >= state.cacheLimit) {
        const newCacheLimit = state.cacheLimit + state.defaultCacheLimit;
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
          displayed: newShowedCards,
          isLeftToDisplay: filteredProfiles.length > state.displayPerPage,
        };
      }

      return {
        ...state,
        displayed: newShowedCards,
        isLeftToDisplay: state.searchResult.length > (state.displayPerPage + state.displayed),
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
