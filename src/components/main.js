import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HERE_APP_ID, HERE_APP_CODE } from '../keys';
import * as actions from '../actions';

const igorUrl = 'http://www.netlore.ru/upload/files/19/large_p19hom1f751nk1c40ml57hu2skj.jpg';

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
    };

    this.map = null;
    this.getLocation = this.getLocation.bind(this);
  }

  addMarker({ lng, lat }, imageUrl) {
    const icon = imageUrl => new window.H.map.DomIcon(`
      <div
        style="
          width: 70px;
          height: 70px;
          background-size: cover;
          background-image: url(${imageUrl})
        "
      ></div>`
    );

    // Create a marker using the previously instantiated icon:
    if (imageUrl) {
      const marker = new window.H.map.DomMarker({ lng, lat }, { icon: icon(imageUrl) });
      this.map.addObject(marker);
    } else {
      const marker = new window.H.map.Marker({ lng, lat });
      this.map.addObject(marker);
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setMapCenter({ lat, lng }) {
    this.map.setCenter({ lat, lng });
  }

  componentDidMount() {
    this.getLocation();
    const platform = new window.H.service.Platform({
      app_id: HERE_APP_ID,
      app_code: HERE_APP_CODE
    });

    const defaultLayers = platform.createDefaultLayers();

    this.map = new window.H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.normal.map,
      {
        zoom: 14,
        center: { lat: 54.1948, lng: 37.6194 }
      });
      
    this.props.actions.mapLoaded();
  }

  render() {
    const { lat, lng } = this.state;

    if(lat) {
      this.setMapCenter({ lat, lng });
      this.addMarker({ lat, lng }); // without image
      this.addMarker({ lat: 54.174269, lng: 37.597771 }, igorUrl); // with image
    }

    return (
      <div>
        <div
          id='mapContainer'
          style={{ width: '640px', height: '480px' }}
        />
      </div>
    );
  }
}

export default connect(
  state => ({ clientProps: state }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(Main);
