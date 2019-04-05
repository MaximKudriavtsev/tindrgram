import * as ActionTypes from './action-types';

const fetchMock = () => fetch('https://my-json-server.typicode.com/MaximKudriavtsev/tindrgram/db');

export function mapLoaded() {
    return function(dispatch) {
        fetchMock()
          .then(data => data.json())
          .then(({images}) => {
              dispatch(imagesLoaded(images))
          })
    }
  }

export function imagesLoaded(payload) {
    return {
        type: ActionTypes.IMAGES_LOADED,
        payload
    }
}