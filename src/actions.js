import * as ActionTypes from './action-types';

export function mapLoaded() {
    return function(dispatch) {
        fetch('https://my-json-server.typicode.com/MaximKudriavtsev/tindrgram/db')
          .then(data => data.json())
          .then(({images}) => {
              dispatch(imagesLoaded(images))
          })
    }
  }


export function getUserLocation() {
    return function(dispatch) {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser.");
        } 
        navigator.geolocation.getCurrentPosition(
            position => { dispatch(receiveUserLocation(position.coords.latitude,position.coords.longitude)) }, 
            PositionError => {console.log(PositionError)}
        );
    }
}

export function receiveUserLocation(lat, lng) {
    return {
        type: ActionTypes.RECEIVE_USER_LOCACTION,
        payload: [lat, lng]
    }
}

export function imagesLoaded(payload) {
    return {
        type: ActionTypes.IMAGES_LOADED,
        payload
    }
}