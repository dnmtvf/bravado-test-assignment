import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ProfileSearch.sss';
import Profile from '../Profile/Profile';
import SearchBarCont from '../../containers/SearchBarCont';

class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: this.props.isFetching };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ isFetching: newProps.isFetching });
  }

  render() {
    const spinnerContainerClassNames = classNames(
      'ProfileSearch__spinnerContainer',
      { 'ProfileSearch__spinnerContainer-visible': this.state.isFetching },
    );

    return (
      <div className="ProfileSearch__container">
        <div className={spinnerContainerClassNames}>
          <div className="ProfileSearch__spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>
        <div className="ProfileSearch__ProfilesTableContainer ProfileSearch__scroll">
          <div className="ProfileSearch__searchBarRow">
            <SearchBarCont />
          </div>
          <Profile
            profileCard={this.props.currentSearchResults}
            searchQuery={this.props.searchQuery}
            selectedCards={this.props.selectedCards}
            clickHandle={this.props.onClickSelectBtn}
          />
        </div>
      </div>
    );
  }
}

ProfileSearch.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  currentSearchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string.isRequired,
  selectedCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickSelectBtn: PropTypes.func.isRequired,
};


export default ProfileSearch;
