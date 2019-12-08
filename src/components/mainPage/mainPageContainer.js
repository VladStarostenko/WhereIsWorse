import React from "react";
import MainPage from ".";
import { connect } from "react-redux";
import { compose } from "redux";
import { setCoordinates } from "../../redux/mapReducer";
import {
  getCurrentWeather,
  getForecastWeather
} from "../../redux/weatherReducer";
class MainPageContainer extends React.Component {
  render() {
    return <MainPage {...this.props} />;
  }
}

let mapStateToProps = state => ({
  lat: state.map.lat,
  lng: state.map.lng,
  currentWeather: state.weather.currentWeather,
  city: state.weather.city,
  arrayWeather: state.weather.arrayWeather,
});
export default compose(
  connect(mapStateToProps, {
    setCoordinates,
    getCurrentWeather,
    getForecastWeather
  })
)(MainPageContainer);
