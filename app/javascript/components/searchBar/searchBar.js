import React from 'react';
import ReactDOM from 'react-dom';
import './searchBar.sss';
import loop from './loop.svg';

const SearchBar = ({ searchQuery, onQueryUpdate }) => {
  return (
      <div className='searchBar'>
        <form>
          <input type="text"
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
};

export default SearchBar;