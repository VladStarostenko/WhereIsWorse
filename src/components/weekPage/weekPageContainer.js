import React from "react";
import WeekPage from ".";
import { connect } from "react-redux";
import { compose } from "redux";
import {getForecastWeather} from './../../redux/weatherReducer';

class WeekPageContainer extends React.Component {
  componentDidMount() {
    this.props.getForecastWeather(this.props.lat, this.props.lng);
  }
  render() {
    return <WeekPage {...this.props} />;
  }
}

let mapStateToProps = state => ({
  arrayWeather: state.weather.arrayWeather,
  lat: state.map.lat,
  lng: state.map.lng
});
export default compose(
  connect(mapStateToProps, {
    getForecastWeather
  })
)(WeekPageContainer);
