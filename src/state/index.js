import { combineReducers } from 'redux';
import postSlice from './app';
import reducer from './AddSlice';
export default combineReducers({postList: postSlice, add: reducer});
