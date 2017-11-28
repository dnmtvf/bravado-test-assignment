import { connect } from 'react-redux';

import SearchBar from '../components/searchBar/searchBar';
import { updateProfilesTable } from '../actions';

const mapStateToProps = (state) => {
  return {
    ...state.searchQuery
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQueryUpdate: newQuery => {
      dispatch(updateProfilesTable(newQuery))
    }
  }
}

const SearchBarCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default SearchBarCont;