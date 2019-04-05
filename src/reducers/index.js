const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING': {
      return {
        ...state,
        loading: true
      };
    }
    case 'RESPONSE': {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state
    }
  }
}
