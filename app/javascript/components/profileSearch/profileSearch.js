import React from 'react';
import ReactDOM from 'react-dom';
import './profileSearch.sss';
import classNames from 'classnames';
import Profile from '../profile/profile';
import SearchBarCont from '../../containers/SearchBarCont';


class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFetching: this.props.isFetching};
  }

  componentWillReceiveProps(newProps){
    this.setState({ isFetching: newProps.isFetching });
  }


  render() {
    const spinnerClasses = classNames('spinnerContainer', { 'spinnerContainer-show': this.state.isFetching});

    return (
      <div className='appContainer'>
      <div className={spinnerClasses}>
      <div className="spinner">

<div className="bounce1"></div>
<div className="bounce2"></div>
<div className="bounce3"></div>
    </div>
    </div>
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
