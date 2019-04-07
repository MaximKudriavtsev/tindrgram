import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "./header";
import Footer from "./footer";
import PhotoView from "./photo-view";
import { HERE_APP_ID, HERE_APP_CODE } from "../keys";
import domMarker from "./marker";
import * as actions from "../actions";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      imageData: null
    };
    this.markerGroup = new H.map.Group();

    this.map = null;

    this.onModalToggle = this.onModalToggle.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.addImageMarker = this.addImageMarker.bind(this);
  }

  onMarkerClick(imageData) {
    this.setState({
      openModal: true,
      imageData
    });
  }

  onModalToggle() {
    this.setState({
      openModal: false
    });
  }

  addImageMarker({ lng, lat }, imageUrl, imgUrlLarge) {
    const that = this;
    const svgMarkup = domMarker(imageUrl);
    const icon = new H.map.DomIcon(svgMarkup);
    const coords = { lat, lng };
    const marker = new H.map.DomMarker(coords, { icon: icon });

    marker.addEventListener("tap", function(evt) {
      console.log(evt.target.getData());
      that.setState({ imageData: evt.target.getData(), openModal: true });
    });
    marker.setData({ imageUrl: imgUrlLarge });

    this.markerGroup.addObject(marker);
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
      app_code: HERE_APP_CODE,
      useCIT: true,
      useHTTPS: true
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

    this.props.actions.mapLoaded({
      lat: this.props.userLocation[0],
      lng: this.props.userLocation[1]
    });
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
    const { openModal, imageData } = this.state;
    this.markerGroup.removeAll();

    // we should remove all markers before create new
    this.props.images.forEach(({ imgUrl, lat, lng, imgUrlLarge }) => {
      this.addImageMarker({ lat: lat, lng: lng }, imgUrl, imgUrlLarge);
    });

    if (this.map) {
      this.map.addObject(this.markerGroup);
    }

    return (
      <div>
        <Header />
        <div
          id="mapContainer"
          style={{
            top: 0,
            position: "absolute",
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`
          }}
        />
        <Footer />

        <PhotoView
          open={openModal}
          onToggle={this.onModalToggle}
          imageData={imageData}
        />
      </div>
    );
  }
}

export default connect(
  x => x,
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Main);
