const initialState = {
  streams: [],
  userName: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        userName: action.payload,
      };

    case 'USER_GET_STREAMS':
      return {
        ...state,
        streams: action.payload,
      };

    case 'USER_ADD_STREAM':
      return {
        ...state,
        streams: [...state.streams, action.payload],
      };

    case 'USER_REMOVE_STREAM':
      return {
        ...state,
        streams: state.streams.filter((stream) => stream !== action.payload),
      };

    default:
      return state;
  }
}

export default userReducer;
