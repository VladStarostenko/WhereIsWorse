import s from "./index.module.css";
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
const API_KEY = "AIzaSyDj5m0sPFlzVPw1ccQ1q7aGf01ukyFmnoA";
const Marker = () => <div className={s.marker}></div>;
function createMapOptions(maps) {
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    fullscreenControl: true,
    mapTypeControl: true,
    scrollwheel: true,
    streetViewControl: true,
    zoomControl: true
  };
}

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 52.22016819175321,
      lng: 21.01126131859803
    },
    zoom: 6
  };
  mapOnClick = mapData => {
    this.props.getCurrentWeather(mapData.lat, mapData.lng);
    this.props.getForecastWeather(mapData.lat, mapData.lng);
    this.props.getCurrentTime(mapData.lat,mapData.lng);
    this.props.setCoordinates(mapData.lat, mapData.lng);
  };

  render() {
    return (
      <div>
        <div className={s.map} style={{ height: "50vh", width: "100%" }}>
          <GoogleMapReact
            onChange={this.onChangeCenter}
            options={createMapOptions}
            onClick={this.mapOnClick}
            bootstrapURLKeys={{
              key: API_KEY,
              language: "en"
            }}
            Maps={{
              GeocoderLocationType: true
            }}
            defaultCenter={this.props.center}
            center={{
              lat: this.props.lat,
              lng: this.props.lng
            }}
            defaultZoom={this.props.zoom}
          >
            <Marker lat={this.props.lat} lng={this.props.lng} />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Map;
