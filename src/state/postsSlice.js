const postsInitialState = {
  posts: [],
  tags: [],
  liked: [],
};

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

    case 'POSTS_FILTERED_LIKED':
      return {
        ...state,
        liked: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
