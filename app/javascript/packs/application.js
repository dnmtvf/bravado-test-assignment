import React from 'react';
import ReactDOM from 'react-dom';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { fetchProfiles, updateProfilesTable } from '../actions'
import rootReducer from '../reducers'

// import ProfileSearch from '../components/profileSearch/profileSearch';
import ProfileSearchCont from '../containers/ProfileSearchCont';

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

store
  .dispatch(fetchProfiles())
  // .then(() => console.log(store.getState()))


// document.addEventListener('DOMContentLoaded', () => {
// ReactDOM.render(
//       <Provider store={store}>
//         <ProSearchCont />
//       </Provider>,
//       document.getElementById('root')
//     )
// })


const devAppWrapper = (App) => {
  document.addEventListener('DOMContentLoaded', () => {  
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )
  })
} 

if(process.env.NODE_ENV === 'development') {
  // devAppWrapper(ProfileSearch);
  devAppWrapper(ProfileSearchCont);
} else {
  render(ProfileSearchCont);
}
