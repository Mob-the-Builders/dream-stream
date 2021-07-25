import { combineReducers } from 'redux';
import postsReducer from './postsSlice';
import userReducer from './userSlice';

export default combineReducers({ postList: postsReducer, user: userReducer });
