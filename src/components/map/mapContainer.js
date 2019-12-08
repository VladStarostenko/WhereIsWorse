import React from "react";
import Map from ".";
import { connect } from "react-redux";
import { compose } from "redux";
import { setCoordinates } from "../../redux/mapReducer";
import {
  getCurrentWeather,
  getForecastWeather
} from "../../redux/weatherReducer";

class MapContainer extends React.Component {
  render() {
    return <Map {...this.props} />;
  }
}

let mapStateToProps = state => ({
  lat: state.map.lat,
  lng: state.map.lng
});
export default compose(
  connect(mapStateToProps, {
    getCurrentWeather,
    getForecastWeather,
    setCoordinates
  })
)(MapContainer);
