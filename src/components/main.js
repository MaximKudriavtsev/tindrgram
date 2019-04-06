import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { HERE_APP_ID, HERE_APP_CODE } from "../keys";
import domMarker from "./marker";
import * as actions from "../actions";
import { header } from "./main.scss";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.map = null;
  }

  addImageMarker({ lng, lat }, imageUrl) {
    const svgMarkup = domMarker(imageUrl);
    const icon = new H.map.DomIcon(svgMarkup),
      coords = { lat, lng },
      marker = new H.map.DomMarker(coords, { icon: icon });

    this.map.addObject(marker);
  }

  addMarker({ lng, lat }) {
    const marker = new window.H.map.Marker({ lng, lat });
    this.map.addObject(marker);
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
      this.addImageMarker({ lat: coordinates[0], lng: coordinates[1] }, url);
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
