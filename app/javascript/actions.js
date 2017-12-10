import fetch from 'cross-fetch';

export const FIND_PROFILES = 'FIND_PROFILES';

export const findProfiles = (searchQuery) => {
  return {
    type: FIND_PROFILES,
    searchQuery,
  };
};

export const REQUEST_PROFILES = 'REQUEST_PROFILES';

const requestProfiles = () => {
  return {
    type: REQUEST_PROFILES,
  };
};

export const RECEIVE_PROFILES = 'RECEIVE_PROFILES';

const receiveProfiles = (profiles) => {
  const profilesWithId = profiles.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });
  return {
    type: RECEIVE_PROFILES,
    profiles: profilesWithId,
  };
};

export const SELECT_PROFILE = 'SELECT_PROFILE';

export const selectProfile = (profileId) => {
  return {
    type: SELECT_PROFILE,
    profileId,
  };
};

export const GET_NEXT_RESULT_PAGE = 'GET_NEXT_RESULT_PAGE';

export const getNextResultPage = () => {
  return {
    type: GET_NEXT_RESULT_PAGE,
  };
};

export const fetchProfiles = () => (dispatch) => {
  dispatch(requestProfiles());
  return fetch('/users')
    .then(
      response => response.json(),
      error => dispatch(receiveError(error)),
    )
    .then(json => dispatch(receiveProfiles(json)));
};
