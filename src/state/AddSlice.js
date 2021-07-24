
const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD':
      console.log('hello from ADD', action.type)
      return {
        count: state.count + 1
      };
      default:
        return state;
    }
  }

export default reducer;