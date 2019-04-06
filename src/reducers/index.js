import * as ActionTypes from '../action-types';


const initialState = {
  images: [],
  userLocation: [54.1948,  37.6194],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.IMAGES_LOADED: {
      return {
        ...state,
        images: payload,
      }
    }

    case ActionTypes.RECEIVE_USER_LOCACTION: {
      return {
        ...state,
        userLocation: payload
      }
    }

    default: {
      return state
    }
  }
}
