import React from 'react';
import ReactDOM from 'react-dom';
import './profileSearch.sss';
import SearchBar from '../searchBar/searchBar';
import Profile from '../profile/profile';
// Component list
//ProfileSearchApp
//  SearchBar
//  ProfileTable
//    Profile

const ProfileSearch = (props) => {
  return (
    <div className='appContainer'>
      <div className='profileSearchContainer'>
        <SearchBar />
        <Profile />
      </div>
    </div>
  );
};

export default ProfileSearch;