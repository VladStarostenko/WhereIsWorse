import React from "react";
import WeekPage from ".";
import { connect } from "react-redux";
import { compose } from "redux";
import { setCoordinates } from "../../redux/mapReducer";
import {
  getCurrentWeather,
  getForecastWeather,
} from "../../redux/weatherReducer";
class WeekPageContainer extends React.Component {
  componentDidMount() {
    if(this.props.currentWeather){
      this.props.getForecastWeather(this.props.lat,this.props.lng);
    } else {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition((pos) => {
        this.props.setCoordinates(pos.coords.latitude,pos.coords.longitude);
        this.props.getCurrentWeather(pos.coords.latitude,pos.coords.longitude);
        this.props.getForecastWeather(pos.coords.latitude,pos.coords.longitude);
      },
        (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }, options);
    }
  }
  render() {
    return <WeekPage {...this.props} />;
  }
}

let mapStateToProps = state => ({
  arrayWeather: state.weather.arrayWeather,
  currentWeather: state.weather.currentWeather,
  lat: state.map.lat,
  lng: state.map.lng,
  city: state.weather.city
});
export default compose(
  connect(mapStateToProps, {
    getForecastWeather,
    setCoordinates,
    getCurrentWeather
  })
)(WeekPageContainer);
