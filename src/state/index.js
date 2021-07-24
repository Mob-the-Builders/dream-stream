import { combineReducers } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import app from './app';

export default combineReducers({ app });
