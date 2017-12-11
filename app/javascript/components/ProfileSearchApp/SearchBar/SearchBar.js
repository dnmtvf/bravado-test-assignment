import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.sss';

const SearchBar = ({ searchQuery, onQueryUpdate }) => (
  <div className="SearchBar">
    <form>
      <input
        type="text"
        placeholder="Search..."
        className="SearchBar-Input"
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
