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

const postsReducer = (state = postsInitialState, action) => {
  switch (action.type) {
    case 'POSTS_LOADED':
      return {
        ...state,
        posts: action.payload,
      };

    case 'POSTS_FILTERED_TAG':
      return {
        ...state,
        tags: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
