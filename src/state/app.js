const postsInitialState = {
  posts: [],
  tags: [],
};
/*
 - add tag
 - remove tag
 - remove all
 - add all

 - add ONE tag => deselect all other tags
 - remove tag === Show all posts
 */

const postsSlice = (state = postsInitialState, action) => {
  switch (action.type) {
    case 'POSTS_GET_ALL':
      return {
        ...state,
        posts: action.payload,
      };

    case 'POSTS_GET_TAG':
      return {
        ...state,
        tags: action.payload,
      };

    default:
      return state;
  }
};

/*
API call get commentList for ALL posts
commentList stored as local state
Post comment?
API call get comment for specific post
Append new comment to commentList
commentList gets saved as local state
commentList gets posted to database
*/

export default postsSlice;
