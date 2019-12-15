import React from "react";
import MainPage from ".";
import { connect } from "react-redux";
import { compose } from "redux";
import { setCoordinates } from "../../redux/mapReducer";
import {
  getCurrentWeather,
  getForecastWeather,
  getCurrentTempCity,
  getCurrentTime,
} from "../../redux/weatherReducer";
class MainPageContainer extends React.Component {
  componentDidMount() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((pos) => {
      this.props.setCoordinates(pos.coords.latitude,pos.coords.longitude);
      this.props.getCurrentWeather(pos.coords.latitude,pos.coords.longitude);
      this.props.getForecastWeather(pos.coords.latitude,pos.coords.longitude);
      this.props.getCurrentTime(pos.coords.latitude,pos.coords.longitude);
      console.log(pos.coords.latitude);
      console.log(pos.coords.longitude);
    }, (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }, options);
    this.props.getCurrentTempCity(this.props.arrayCity);
  }
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
  arrayCity: state.weather.arrayCity,
  currentTime:state.weather.currentTime,
});
export default compose(
  connect(mapStateToProps, {
    getCurrentTempCity,
    setCoordinates,
    getCurrentWeather,
    getForecastWeather,
    getCurrentTime,
  })
)(MainPageContainer);
