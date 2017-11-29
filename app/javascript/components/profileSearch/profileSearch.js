import React from 'react';
import ReactDOM from 'react-dom';
import './profileSearch.sss';
// import SearchBar from '../searchBar/searchBar';
import Profile from '../profile/profile';
import SearchBarCont from '../../containers/SearchBarCont';
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
        <div className='profileSearchContainer style-1'>
          <div className='searchBarRow'>
          <SearchBarCont />          
          </div>
          <div className='profilesRow'>
            <Profile
              profileCard={this.props.currentSearchResults}
              searchQuery={this.props.searchQuery}
              selectedCards={this.props.selectedCards}
              clickHandle={this.props.onClickSelectBtn}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileSearch;