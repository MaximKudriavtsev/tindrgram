import * as ActionTypes from './action-types';

const fetchMock = () => Promise.resolve('data');

export function mapLoaded() {
    return function(dispatch) {
        fetchMock()
          .then((data) => {
              dispatch(imagesLoaded(data))
          })
    }
  }

export function imagesLoaded(payload) {
    return {
        type: ActionTypes.IMAGES_LOADED,
        payload
    }
}