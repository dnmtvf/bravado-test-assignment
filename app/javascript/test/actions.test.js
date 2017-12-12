import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import fetch from 'cross-fetch';
import fetchMock from 'fetch-mock';
import {
  FIND_PROFILES,
  REQUEST_PROFILES,
  RECEIVE_PROFILES,
  SELECT_PROFILE,
  GET_NEXT_RESULT_PAGE,
  findProfiles,
  requestProfiles,
  receiveProfiles,
  selectProfile,
  getNextResultPage,
  fetchProfiles,
} from '../actions';

import testProfilesArr from './testProfilesArr';

describe('synchronous actions creators tests', () => {
  test('should create an action to find profiles by given search query', () => {
    const searchQuery = 'Richard';
    const expectedAction = {
      type: FIND_PROFILES,
      searchQuery,
    };
    expect(findProfiles(searchQuery)).toEqual(expectedAction);
  });

  test('should create an action to find profiles with empty search query', () => {
    const searchQuery = '';
    const expectedAction = {
      type: FIND_PROFILES,
      searchQuery,
    };
    expect(findProfiles(searchQuery)).toEqual(expectedAction);
  });

  test('should create an action to inform about starting of async query', () => {
    const expectedAction = {
      type: REQUEST_PROFILES,
    };
    expect(requestProfiles()).toEqual(expectedAction);
  });

  test('should create an action to add profiles to a store, also action creator adds id field to recieved arr', () => {
    const testProfilesArrWithId = testProfilesArr.map((i, index) => {
      return { ...i, id: index + 1 };
    });
    const expectedAction = {
      type: RECEIVE_PROFILES,
      profiles: testProfilesArrWithId,
    };
    expect(receiveProfiles(testProfilesArr)).toEqual(expectedAction);
  });

  test('should create an action to select a profile with id 21', () => {
    const expectedAction = {
      type: SELECT_PROFILE,
      profileId: 21,
    };
    expect(selectProfile(21)).toEqual(expectedAction);
  });

  test('should create an action to select a profile with id 1134', () => {
    const expectedAction = {
      type: SELECT_PROFILE,
      profileId: 1134,
    };
    expect(selectProfile(1134)).toEqual(expectedAction);
  });

  test('should create an action to get next page of search result', () => {
    const expectedAction = {
      type: GET_NEXT_RESULT_PAGE,
    };
    expect(getNextResultPage()).toEqual(expectedAction);
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions creators tests', () => {
  test('should dispatch REQUEST_PROFILES action when fetch data and dispatch RECEIVE_PROFILES action', () => {
    const mockResp = JSON.stringify([...testProfilesArr]);
    const mockHead = new Headers();
    mockHead.append('Content-Type': 'application/json; charset=utf-8');

    fetch.mockResponse(mockResp, mockHead);

    const testProfilesArrWithId = testProfilesArr.map((i, index) => {
      return { ...i, id: index + 1 };
    });
    const expectedActions = [
      { type: REQUEST_PROFILES },
      {
        type: RECEIVE_PROFILES,
        profiles: [...testProfilesArrWithId],
      },
    ];
    const store = mockStore({ profiles: [] });


    return store.dispatch(fetchProfiles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
