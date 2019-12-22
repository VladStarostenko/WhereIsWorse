import React from "react";
import MainPage from ".";
import { connect } from "react-redux";
import { compose } from "redux";
import { setCoordinates } from "../../redux/mapReducer";
import {
  getCurrentWeather,
  getForecastWeather,
  getCurrentTempCity,
} from "../../redux/weatherReducer";
class MainPageContainer extends React.Component {
  componentWillMount() {
    this.props.getCurrentTempCity(this.props.arrayCity);
    if(this.props.currentWeather){
      this.props.setCoordinates(this.props.lat, this.props.lng);
      this.props.getCurrentWeather(this.props.lat, this.props.lng);
      this.props.getForecastWeather(this.props.lat, this.props.lng);
    } else {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition((pos) =>
      {
        this.props.setCoordinates(pos.coords.latitude,pos.coords.longitude);
        this.props.getCurrentWeather(pos.coords.latitude,pos.coords.longitude);
        this.props.getForecastWeather(pos.coords.latitude,pos.coords.longitude);
      }, (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }, options);
    }
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
});
export default compose(
  connect(mapStateToProps, {
    getCurrentTempCity,
    setCoordinates,
    getCurrentWeather,
    getForecastWeather,
  })
)(MainPageContainer);
