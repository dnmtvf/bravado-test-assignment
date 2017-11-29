import { connect } from 'react-redux';
import ProfileSearch from '../components/ProfileSearch/ProfileSearch';
import { selectCard } from '../actions';

const mapStateToProps = (state) => {
  return {
    currentSearchResults: state.currentSearchResult,
    isFetching: state.isFetching,
    searchQuery: state.searchQuery,
    selectedCards: state.selectedCards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSelectBtn: (cardId) => {
      dispatch(selectCard(cardId));
    },
  };
};

const ProfileSearchCont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSearch);

export default ProfileSearchCont;
