
const initialState = {
  streams: [],
  userName: '',
};

function userReducer(state = initialState, action) {
  switch(action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        userName: action.payload
      };

      case 'USER_ADD_STREAM':
        console.log('hello from user slice', action.type)
        return {
          ...state,
          streams: [...state.streams, action.payload]
        };

        case 'USER_REMOVE_STREAM':
          console.log('hello from user remove', action.type)
          return {
            ...state,
            streams: state.streams.filter(stream => stream !== action.payload)
          };

      default:
        return state;
    }
  }

export default userReducer;