import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root.jsx';
import { configureStore } from './store/store.js';
import { login, logout, signup } from './actions/session_actions.js';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  let preloadedState;
  if (window.currentUser) {
    preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: {
        id: window.currentUser.id
      }
    };
    delete window.currentUser;
  } else {
    preloadedState = {};
  }
  const store = configureStore(preloadedState);
  window.store = store;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  ReactDOM.render(<Root store={store}></Root>, root);
});
