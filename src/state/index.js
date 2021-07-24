import { combineReducers } from 'redux';
import postSlice from './app';
import reducer from './AddSlice';
export default combineReducers({post: postSlice, add: reducer});
