import { combineReducers } from 'redux';
import postsReducer from './postsSlice';
import userReducer from './UserSlice';

export default combineReducers({ postList: postsReducer, user: userReducer });
