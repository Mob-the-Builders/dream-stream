import axios from 'axios'

const postsInitialState = {
  posts: [],
};

// store.dispatch({ type: 'POSTS_INIT', getPosts})
const postsSlice = ( state = postsInitialState, action ) => {
  switch (action.type) {
    case 'POSTS_GET_ALL':
      console.log("IN POST GET ALL REDUCeR", action)
      return{
        ...state,
        posts: action.payload,
      };
    default:
      console.log('hello from reducer default') ;   
      return state;
  }
}

/* 
API call get commentList for ALL posts 
commentList stored as local state
Post comment?
API call get comment for specific post
Append new comment to commentList
commentList gets saved as local state
commentList gets posted to database
*/


// const initialState = {
//   dark: false,
// };

// const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';
 
// const toggleDarkMode = isDarkMode => ({
//   type: TOGGLE_DARKMODE, 
//   isDarkMode: isDarkMode
// });

// const exampleReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case TOGGLE_DARKMODE:
//       return {
//          ...state, 
//          dark: action.isDarkMode 
//         };
//     default:
//       return state;
//   }
// };

export default postsSlice;