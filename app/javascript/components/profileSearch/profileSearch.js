import React from 'react';
import ReactDOM from 'react-dom';
import './profileSearch.sss';
import SearchBar from '../searchBar/searchBar';
// Component list
//ProfileSearchApp
//  SearchBar
//  ProfileTable

const ProfileSearch = (props) => {
  return (
    <div className='appContainer'>
      <div className='profileSearchContainer'>
        <SearchBar />
      </div>
    </div>
  );
};

export default ProfileSearch;