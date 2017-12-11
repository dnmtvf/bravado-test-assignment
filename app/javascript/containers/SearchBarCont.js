import { connect } from 'react-redux';

import SearchBar from '../components/ProfileSearchApp/SearchBar/SearchBar';
import { findProfiles } from '../actions';

const mapStateToProps = (state) => {
  return {
    searchQuery: state.searchQuery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQueryUpdate: (newQuery) => {
      dispatch(findProfiles(newQuery));
    },
  };
};

const SearchBarCont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);

export default SearchBarCont;
