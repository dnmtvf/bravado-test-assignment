import fetch from 'cross-fetch';

export const UPDATE_PROFILES_TABLE = 'UPDATE_PROFILES_TABLE'

export const updateProfilesTable = (searchQuery) => {
  return {
    type: UPDATE_PROFILES_TABLE,
    newSearchQuery
  }
};

export const REQUEST_PROFILES = 'REQUEST_PROFILES'
const requestProfiles = () => {
  return {
    type: REQUEST_PROFILES,
    fetchStart: Date.now()
  }
}

export const RECEIVE_PROFILES = 'RECEIVE_PROFILES'
function receiveProfiles(json) {
  return {
    type: RECEIVE_PROFILES,
    profiles: json,
    fetchEnd: Date.now()
  }
}

export const fetchProfiles = () => {
  return (dispatch) => {
    dispatch(requestProfiles())
    return fetch(`/users`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveProfiles(json))
      )
  }
}