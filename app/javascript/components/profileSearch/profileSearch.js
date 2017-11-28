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

class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFetching: this.props.isFetching};
  }
  
  render() {
    return (
      <div className='appContainer'>
        <div className='profileSearchContainer'>
          <div className='searchBarRow'>
          <SearchBar />          
          </div>
          <div className='profilesRow'>
            <Profile profileCard={this.props.profiles} />
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileSearch;