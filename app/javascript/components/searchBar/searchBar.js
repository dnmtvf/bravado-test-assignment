import React from 'react';
import ReactDOM from 'react-dom';
import './searchBar.sss';
import loop from './loop.svg';

const SearchBar = (props) => {
  return (
      <div className='searchBar'>
        <form>
          <input type="text" placeholder="Search..." className="searchBar__input" />
        </form>
      </div>
  );
};

export default SearchBar;