import React, { useState, Component } from "react";
import styled from 'styled-components';
import day from "../../images/day.jpg";
import night from "../../images/night.jpg";
import MapContainer from "./../map/mapContainer";
import Console from "./console";
import sky from "../../images/sky.svg"
import skysun from "../../images/skysun.svg"
import sun from "../../images/sun.svg"

const Tr = styled.tr`
  font-size: 15px;
`;

const Td = styled.td`
  padding-right: 3px;
  padding-left: 3px;
`;

const Weather = props => {
  const degToDir=(deg)=>{
    if (deg >= 22.5 && deg < 67.5){
      return "NE";
    }else if (deg >= 67.5 && deg<112.5){
      return "E";
    }else if (deg >= 112.5 && deg<157.5){
      return "SE";
    }else if (deg >= 157.5 && deg<202.5){
      return "S";
    }else if (deg >= 202.5 && deg<247.5){
      return "SW";
    }else if (deg >= 247.5 && deg<292.5){
      return "W";
    }else if (deg >= 292.5 && deg<337.5){
      return "NW";
    }else{
      return "N";
    }
  }
  let arrayDay=[];
  for (let i= 0;i< 8; i++) {
    arrayDay.push(props.arrayWeather[i]);
  }

  const setCurTime = (weather) => {
    let curTime = parseInt(weather.dt_txt.slice(11,13)) + props.city.timezone/3600;
    if(curTime < 0) {
      curTime += 24;
    } else if (curTime > 24) {
      curTime -=24;
    }
    return curTime;
  }

  const setSky = (weather) => {
    let icon
    if(weather.clouds.all > 66){
      icon = sky
    }else if(weather.clouds.all > 33 && weather.clouds.all <= 66){
      icon = skysun
    }else{
      icon = sun
    }
    return icon
  }


  let elementDayTime = arrayDay.map(weather=> (
    <Td key={arrayDay.indexOf(weather)}>{setCurTime(weather)}</Td>
  ))

  let elementDayTemp = arrayDay.map(weather=> (
    <Td className="text-center" key={arrayDay.indexOf(weather)}>{Math.round(weather.main.temp-273.15)} C</Td>
  ))

  let elementDayIcon = arrayDay.map(weather=> (
    <Td className="text-center" key={arrayDay.indexOf(weather)}><img width="47.2" height="47.2" src={setSky(weather)} alt="icon" /></Td>
  ))

  return (
    <div style={{backgroundColor: '#f6f6f6'}} className="col-md-6">
      <h3 className="text-center">{props.city.name}</h3>
      <div className="getting-started-info">
        <div className="table-responsive">
          <table className="table">
            <tbody className="text-center">
            <Tr>
              <Td className="text-center">Zaraz</Td>

              {elementDayTime}
            </Tr>
            <Tr>
              <Td className="text-center">{Math.round(props.currentWeather.main.temp-273.15)} C</Td>
              {elementDayTemp}
            </Tr>
            <Tr>
              <Td className="text-center"><img width="47.2" height="47.2" src={setSky(props.currentWeather)} alt="icon" /></Td>
              {elementDayIcon}
            </Tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="table-responsive">
          <table className="table">
            <tbody className="text-center">
            <Tr>
              <Td>Wiatr: {props.currentWeather.wind.speed} m/s {degToDir(props.currentWeather.wind.deg)}</Td>
            </Tr>
            <Tr>
              <Td>Widoczność: {props.currentWeather.visibility} m</Td>
            </Tr>
            <Tr>
              <Td>Ciśnięcie: {props.currentWeather.main.pressure} hPa</Td>
            </Tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

class MainPage extends React.Component {
  setTime() {
    let d = new Date()
    let curTime = d.getUTCHours() + this.props.currentWeather.timezone/3600;
    if(curTime < 0) {
      curTime += 24;
    } else if (curTime > 24) {
      curTime -=24;
    }
    let date;
    if(curTime > 7 && curTime < 20) {
      date = day
    } else {
      date = night
    }
    return date
  }

  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      latLng: []
    };
  }

  updateData = (latitude, longitude) => {
    this.setState({ lat: latitude, lng: longitude });
    this.props.getCurrentWeather(latitude, longitude);
    this.props.getForecastWeather(latitude, longitude);
    this.props.setCoordinates(latitude, longitude);
  };

  searchButton = () => {
    const { latLng } = this.state;
    this.props.getForecastWeather(latLng.lat, latLng.lng);
    this.props.getCurrentWeather(latLng.lat, latLng.lng);
  };

  render() {

    if(!(this.props.city && this.props.currentWeather)){
      return <div></div>
    }
    const sortArrayCity=(arrayCity)=> {
      return arrayCity.sort(function(a, b){
        return a.temp-b.temp
      })
    }

    const findCity=(sortArray) => {
      let index;
      for(let i = 0; i < sortArray.length; i++){
        if(sortArray[i].temp === Math.round(this.props.currentWeather.main.temp-273.15)){
          index = i;
          return index;
        }
      }
    }

    let sortArray =sortArrayCity(this.props.arrayCity);
    let indexOfOurCity = findCity(sortArray);

    let sortArray5El =[];
    let uniqKey = [];

    if(!(indexOfOurCity)){
      return <div></div>
    }

    while(uniqKey.length < 5) {
      let k = Math.floor(Math.random() * (indexOfOurCity));
      if(!uniqKey.includes( k )){
        if(sortArray[k].temp !== null) {
          uniqKey.push(k);
          sortArray5El.push(sortArray[k]);
        }
      }
    }

    sortArray5El = sortArrayCity(sortArray5El)

    let elementBadCityName = sortArray5El.map(city=> (
      <Td key={sortArray.indexOf(city)}>{city.name}</Td>
    ));

    let elementBadCityTemp = sortArray5El.map(city=> (
      <Td key={sortArray.indexOf(city)}>{city.temp} C</Td>
    ));


    return (
      <div>
        <main className="page landing-page" style={{paddingTop: '20px'}}>
          <section style={{paddingBottom: '10px', backgroundSize: "100%", backgroundImage: `url(${this.setTime()})`}}
                   className="clean-block clean-info dark">
            <div className="container">
              <Console
                updateData={this.updateData}
                searchButton={this.searchButton}
              />
              <div style={{margin: '0px'}} className="row align-items-center">
                <div className="col-md-6">
                  <MapContainer />
                </div>
                <Weather
                  city={this.props.city}
                  arrayWeather={this.props.arrayWeather}
                  currentWeather={this.props.currentWeather}
                  arrayCity={this.props.arrayCity}
                />
              </div>
              <div style={{backgroundColor: '#f6f6f6'}}>
                <h3 style={{
                  marginTop: '15px',
                  marginBottom: '15px',
                  paddingTop: '5px',
                  paddingBottom: '5px'
                }} className="text-center">Gdzie jest gorzej ?</h3>
                <div className="table-responsive">
                  <table className="table">
                    <thead className="text-center">
                    <Tr>
                      {elementBadCityName}
                    </Tr>
                    </thead>
                    <tbody className="text-center">
                    <Tr>
                      {elementBadCityTemp}
                    </Tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer style={{paddingTop: 0}} className="page-footer dark">
          <div style={{marginTop: 0}} className="footer-copyright">
            <p>© 2019 Bad_Weather</p>
          </div>
        </footer>
      </div>
    );
  }
}
export default MainPage;

