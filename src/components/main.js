import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { HERE_APP_ID, HERE_APP_CODE } from "../keys";
import * as actions from "../actions";

import { header } from "./main.scss";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.map = null;
  }

  addMarker({ lng, lat }, imageUrl) {
    const icon = imageUrl =>
      new window.H.map.DomIcon(`
      <div
        style="
          width: 70px;
          height: 70px;
          background-size: cover;
          background-image: url(${imageUrl})
        "
      ></div>`);

    // Create a marker using the previously instantiated icon:
    if (imageUrl) {
      const marker = new window.H.map.DomMarker(
        { lng, lat },
        { icon: icon(imageUrl) }
      );
      this.map.addObject(marker);
    } else {
      const marker = new window.H.map.Marker({ lng, lat });
      this.map.addObject(marker);
    }
  }

  setMapCenter({ lat, lng }) {
    this.map.setCenter({ lat, lng });
  }

  componentDidMount() {
    const platform = new window.H.service.Platform({
      app_id: HERE_APP_ID,
      app_code: HERE_APP_CODE
    });

    const defaultLayers = platform.createDefaultLayers();

    this.map = new window.H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.normal.map,
      {
        zoom: 14,
        center: {
          lat: this.props.userLocation[0],
          lng: this.props.userLocation[1]
        }
      }
    );
    this.mapBehavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(this.map)
    );
    // this.mapUi = window.H.ui.UI.createDefault(this.map, defaultLayers); // add +/- buttons

    this.props.actions.mapLoaded();
    this.props.actions.getUserLocation();
  }

  componentDidUpdate() {
    this.map.setCenter({
      lat: this.props.userLocation[0],
      lng: this.props.userLocation[1]
    });
    this.addMarker({
      lat: this.props.userLocation[0],
      lng: this.props.userLocation[1]
    }); // without image
  }

  render() {
    this.props.images.forEach(({ url, coordinates }) => {
      this.addMarker({ lat: coordinates[0], lng: coordinates[1] }, url); // with image
    });

    return (
      <div>
        <div className={header} />
        <div
          id="mapContainer"
          style={{
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`
          }}
        />
      </div>
    );
  }
}

export default connect(
  x => x,
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Main);
