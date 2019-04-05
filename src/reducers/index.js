import * as ActionTypes from '../action-types';


const initialState = {
  images: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.IMAGES_LOADED: {
      return {
        ...state,
        images: payload,
      }
    }

    default: {
      return state
    }
  }
}
