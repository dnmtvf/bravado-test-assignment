import React from 'react';
import ReactDOM from 'react-dom';

import { TestComp } from '../components/profileSearch/profileSearch';

const devAppWrapper = (App) => {
  document.addEventListener('DOMContentLoaded', () => {  
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    )
  })
} 

if(process.env.NODE_ENV === 'development') {
  devAppWrapper(TestComp);
} else {
  render(TestComp);
}
