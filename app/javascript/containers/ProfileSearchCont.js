import { connect } from 'react-redux';
import ProfileSearch from '../components/ProfileSearch/ProfileSearch';
import { selectProfile, getNextResultPage } from '../actions';

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResult.filter((item, index) => index < state.displayed),
    isFetching: state.isFetching,
    searchQuery: state.searchQuery,
    selectedProfiles: state.selectedProfiles,
    excludedInSearch: state.excludedInSearch,
    isLeftToDisplay: state.isLeftToDisplay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSelectBtn: (profileId) => {
      dispatch(selectProfile(profileId));
    },
    onClickShowMore: () => {
      dispatch(getNextResultPage());
    },
  };
};

const ProfileSearchCont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSearch);

export default ProfileSearchCont;
