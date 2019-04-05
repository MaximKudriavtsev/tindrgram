import * as React from 'react';
import { HERE_APP_ID, HERE_APP_CODE } from '../keys';

export default class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.map = null;
  }

  componentDidMount() {
    const platform = new window.H.service.Platform({
      app_id: HERE_APP_ID,
      app_code: HERE_APP_CODE
    });

    const defaultLayers = platform.createDefaultLayers();

    this.map = new window.H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.normal.map,
      {
        zoom: 13,
        center: { lat: 54.1948, lng: 37.6194 }
      });


    // Create a marker icon from an image URL:
    var icon = new window.H.map.DomIcon(`<div
            style="
            width: 70px;
            height: 70px;
            background-size: cover;
            background-image: url(http://www.netlore.ru/upload/files/19/large_p19hom1f751nk1c40ml57hu2skj.jpg)
            "
        ></div>`);

    // Create a marker using the previously instantiated icon:
    var marker = new window.H.map.DomMarker({ lat: 54.1948, lng: 37.6194 }, { icon: icon });

    // Add the marker to the map:
    this.map.addObject(marker);
  }

  render() {
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
