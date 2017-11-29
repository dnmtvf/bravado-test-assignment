import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.sss';
import loop from './loop.svg'; // eslint-disable-line

const SearchBar = ({ searchQuery, onQueryUpdate }) => (
  <div className="searchBar">
    <form>
      <input
        type="text"
        placeholder="Search..."
        className="searchBar__input"
        value={searchQuery}
        onChange={
          (e) => {
            onQueryUpdate(e.target.value);
          }
        }
      />
    </form>
  </div>
);

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onQueryUpdate: PropTypes.func.isRequired,
};

export default SearchBar;
