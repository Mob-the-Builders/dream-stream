import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '.';
import { composeWithDevTools } from "redux-devtools-extension";

const createStore = () => reduxCreateStore(rootReducer, composeWithDevTools());

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);