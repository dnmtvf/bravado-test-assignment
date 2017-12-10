import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ProfileSearch.sss';
import Profile from '../Profile/Profile';
import SearchBarCont from '../../containers/SearchBarCont';

class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: this.props.isFetching, isLeftToDisplay: this.props.isLeftToDisplay };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ isFetching: newProps.isFetching, isLeftToDisplay: newProps.isLeftToDisplay });
  }

// this.state.isRestToShow

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
            profileCard={this.props.searchResults}
            searchQuery={this.props.searchQuery}
            selectedProfiles={this.props.selectedProfiles}
            onClickSelectBtn={this.props.onClickSelectBtn}
            onClickShowMore={this.props.onClickShowMore}
            excludedInSearch={this.props.excludedInSearch}
            isLeftToDisplay={this.state.isLeftToDisplay}
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
