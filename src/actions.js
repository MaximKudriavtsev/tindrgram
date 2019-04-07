import * as ActionTypes from "./action-types";

const API_URL =
  "https://b8yu7yk4hj.execute-api.eu-central-1.amazonaws.com/photo/";

export function mapLoaded() {
  return function(dispatch) {
    fetch(API_URL, { mode: "cors" })
      .then(res => res.json())
      .then(images => {
        dispatch(imagesLoaded(images));
      })
      .catch(e => console.log(e));
  };
}

export function getUserLocation() {
  return function(dispatch) {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch(
          receiveUserLocation(
            position.coords.latitude,
            position.coords.longitude
          )
        );
      },
      PositionError => {
        console.log(PositionError);
      }
    );
  };
}

export function receiveUserLocation(lat, lng) {
  return {
    type: ActionTypes.RECEIVE_USER_LOCACTION,
    payload: [lat, lng]
  };
}

export function imagesLoaded(payload) {
  return {
    type: ActionTypes.IMAGES_LOADED,
    payload
  };
}
