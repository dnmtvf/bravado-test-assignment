import fetch from 'cross-fetch';

export const UPDATE_PROFILES_TABLE = 'UPDATE_PROFILES_TABLE';

export const updateProfilesTable = (searchQuery) => {
  return {
    type: UPDATE_PROFILES_TABLE,
    searchQuery,
  };
};

export const REQUEST_PROFILES = 'REQUEST_PROFILES';

const requestProfiles = () => {
  return {
    type: REQUEST_PROFILES,
    fetchStart: Date.now(),
  };
};

export const RECEIVE_PROFILES = 'RECEIVE_PROFILES';

const receiveProfiles = (json) => {
  return {
    type: RECEIVE_PROFILES,
    profiles: json,
    fetchEnd: Date.now(),
  };
};

export const SELECT_CARD = 'SELECT_CARD';

export const selectCard = (cardId) => {
  return {
    type: SELECT_CARD,
    cardId,
  };
};

export const fetchProfiles = () => (dispatch) => {
  dispatch(requestProfiles());
  return fetch('/users')
    .then(response => response.json())
    .then(json => dispatch(receiveProfiles(json)));
};
