import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <h1>Test</h1>;
}

const devAppWrapper = (App) => {
  document.addEventListener('DOMContentLoaded', () => {  
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    )
  })
} 

if(process.env.NODE_ENV === 'development') {
  devAppWrapper(App);
} else {
  render(App);
}
