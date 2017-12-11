import { connect } from 'react-redux';
import ProfileSearchApp from '../components/ProfileSearchApp/ProfileSearchApp';
import { selectProfile, getNextResultPage } from '../actions';
import highlightText from '../components/highlightText';

const mapStateToProps = (state) => {
  const searchResult = state.searchResult.map((item) => {
    const isSelected = state.selectedProfiles.includes(item.id);
    const highlightedItem = highlightText(
      item,
      state.searchQuery,
      'ProfileCard-highlight',
      state.excludedInSearch,
    );
    return {
      ...highlightedItem,
      isSelected,
    };
  }).filter((item, index) => index < state.displayed);

  return {
    searchResult,
    isFetching: state.isFetching,
    isLeftToDisplay: state.isLeftToDisplay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSelectBtn: (profileId) => {
      dispatch(selectProfile(profileId));
    },
    onClickDisplayNextPage: () => {
      dispatch(getNextResultPage());
    },
  };
};

const ProfileSearchCont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSearchApp);

export default ProfileSearchCont;
