import { combineReducers } from 'redux';
import postSlice from './app';
import reducer from './AddSlice';
 import userReducer from './UserSlice';
export default combineReducers({postList: postSlice, add: reducer, user:userReducer});
