import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ProfileSearchApp.sss';
import ProfileCard from './ProfileCard/ProfileCard';
import SearchBarCont from '../../containers/SearchBarCont';

const DisplayNextPageBtn = (props) => {
  if (props.isLeftToDisplay) {
    return (
      <div className='ProfileSearchApp-NextPageBtnContainer'>
      <button
        className="ProfileSearchApp-NextPageBtn"
        onClick={
          (e) => {
            e.preventDefault();
            props.clickHandle();
          }
        }
      >
      Show more...
      </button>
      </div>
    );
  }

  return null;
};

class ProfileSearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: this.props.isFetching,
      isLeftToDisplay: this.props.isLeftToDisplay,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ isFetching: newProps.isFetching, isLeftToDisplay: newProps.isLeftToDisplay });
  }

  render() {
    const spinnerContainerClassNames = classNames(
      'ProfileSearchApp-SpinnerContainer',
      { 'ProfileSearchApp-SpinnerContainer-visible': this.state.isFetching },
    );

    const ProfilesTable = (props) => {
      const profileCard = props.searchResult.map(item => (
        <ProfileCard
          key={item.id}
          profileCredentials={item}
          onClickSelectBtn={props.onClickSelectBtn}
        />
      ));

      return <div className="ProfileSearchApp-ProfilesTable">{profileCard}</div>;
    };

    return (
      <div className="AppContainer">
        <div className="ProfileSearchApp AppContainer-ProfileSearchApp">
          <div className="ProfileSearchApp-SearchBar">
            <SearchBarCont />
          </div>
          <ProfilesTable
            searchResult={this.props.searchResult}
            onClickSelectBtn={this.props.onClickSelectBtn}
          />
          <DisplayNextPageBtn
            clickHandle={this.props.onClickDisplayNextPage}
            isLeftToDisplay={this.state.isLeftToDisplay}
          />
          <div className={spinnerContainerClassNames}>
            <div className="ProfileSearch-Spinner">
              <div className="ProfileSearch-Bounce1" />
              <div className="ProfileSearch-Bounce2" />
              <div className="ProfileSearch-Bounce3" />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

ProfileSearchApp.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isLeftToDisplay: PropTypes.bool.isRequired,
  searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickDisplayNextPage: PropTypes.func.isRequired,
  onClickSelectBtn: PropTypes.func.isRequired,
};

DisplayNextPageBtn.propTypes = {
  isLeftToDisplay: PropTypes.bool.isRequired,
  clickHandle: PropTypes.func.isRequired,
};

export default ProfileSearchApp;
