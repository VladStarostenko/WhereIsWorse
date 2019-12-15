import React, { useState, Component } from "react";
import styled from 'styled-components';
import day from "../../images/day.jpg";
import night from "../../images/night.jpg";
import MapContainer from "./../map/mapContainer";
import Console from "./console";

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
  const testHujest=()=> {
    let currentTime = props.currentTime.slice(11,13);
    currentTime = parseInt(currentTime);
    let arrayTime=[];
    let nextTime = 0;
    console.log(currentTime);
    console.log(currentTime+2);
    if(currentTime > 0 && currentTime <3) {
      nextTime = 3; 
    } else  if(currentTime >= 0 && currentTime <3) {
      nextTime = 3; 
    } else  if(currentTime >= 3 && currentTime <6) {
      nextTime = 6; 
    } else  if(currentTime >= 6 && currentTime <9) {
      nextTime = 9; 
    } else  if(currentTime >= 9 && currentTime <12) {
      nextTime = 12; 
    } else  if(currentTime >= 12 && currentTime <15) {
      nextTime = 15; 
    } else if(currentTime >= 15 && currentTime <18) {
      nextTime = 18; 
    } else if(currentTime >= 18 && currentTime <21) {
      nextTime = 21; 
    } else if(currentTime >= 21 && currentTime <24) {
      nextTime = 0;
    }
    for(let i = 0; i < 8; i++) {
      arrayTime.push(nextTime);
      if(nextTime == 24) {
        nextTime=0;
      }
      nextTime+=3;
    }
    console.log(arrayTime);
    return(arrayTime);
  }
  let arrayDay=[];
  for (let i= 0;i< 8; i++) {
    arrayDay.push(props.arrayWeather[i]);
  }

  // let elementDayTime = arrayDay.map(weather=> (
  //   <Td key={arrayDay.indexOf(weather)}>{weather.dt_txt.slice(11,13)}</Td>
  // ))
  let elementDayTime = testHujest().map(time=> (
    <Td key={testHujest().indexOf(time)}>{time}</Td>
  ))

  let elementDayTemp = arrayDay.map(weather=> (
    <Td className="text-center" key={arrayDay.indexOf(weather)}>{Math.round(weather.main.temp-273.15)} C</Td>
  ))
  return (
    <div style={{backgroundColor: '#f6f6f6'}} className="col-md-6">
<h3 className="text-center">{props.city.name}    and time  =  {props.currentTime? props.currentTime.slice(11,13) : undefined}</h3>
      <div className="getting-started-info">
        <div className="table-responsive">
          <table className="table">
            <button onClick={testHujest}>testHujest</button>
            <tbody className="text-center">
            <Tr>
              <Td className="text-center">Zaraz</Td>

              {elementDayTime}
            </Tr>
            <Tr>
              <Td className="text-center">{Math.round(props.currentWeather.main.temp-273.15)} C</Td>
              {elementDayTemp}
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
      <button className="btn btn-outline-primary btn-lg text-center" onClick={()=> {console.log(props.arrayCity)}} type="button">Update</button>
    </div>
  );
};

class MainPage extends React.Component {
  setTime() {
    let time;
    const date = new Date().getHours()
    if(date > 7 && date < 20) {
      time = day
    } else {
      time = night
    }
    return time
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
    this.props.getCurrentTime(latitude,longitude);
    console.log(this.props.getForecastWeather(latitude, longitude))
  };

  searchButton = () => {
    const { latLng } = this.state;
    this.props.getForecastWeather(latLng.lat, latLng.lng);
    this.props.getCurrentWeather(latLng.lat, latLng.lng);
    this.props.getCurrentTime(latLng.lat,latLng.lng);
  };

  render() {
    // ElementWeather = <Weather
    //       city={this.props.city}
    //       data={weather.dt_txt}
    //       clouds={weather.clouds.all}
    //       temp={weather.main.temp}
    //       temp_max={weather.main.temp_max}
    //       temp_min={weather.main.temp_min}
    //       pressure={weather.main.pressure}
    //       humidity={weather.main.humidity}
    //       mainSky={weather.weather.main}
    //       // sky={weather.weather.description}
    //       sky={this.props.arrayWeather[0].weather.description}
    //       speed={weather.wind.speed}
    //       deg={weather.wind.deg}
    //     />

    if(!(this.props.city && this.props.currentWeather)){
      return <div></div>
    }
    const sortArrayCity=(arrayCity)=> {
      return arrayCity.sort(function(a, b){
        return a.temp-b.temp
      })
    }
    let sortArray =sortArrayCity(this.props.arrayCity);
    let sortArray5El =[];
    for(let i =0; i<5;i++) {
      sortArray5El.push(sortArray[i]);
    }

    let elementBadCityName = sortArray5El.map(city=> (
      <Td key={sortArray.indexOf(city)}>{city.name}</Td>
    ));

    let elementBadCityTemp = sortArray5El.map(city=> (
      <Td key={sortArray.indexOf(city)}>{city.temp} C</Td>
    ));


    return (
      <div>
        <main className="page landing-page" style={{paddingTop: '50px'}}>
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
                  currentTime={this.props.currentTime}
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
                   {/*<Tr>*/}
                    {/*  <td>Opady</td>*/}
                    {/*  <td>Opady</td>*/}
                    {/*  <td>Opady</td>*/}
                    {/*  <td>Opady</td>*/}
                    {/*  <td>Opady</td>*/}
                    {/*</Tr>*/}
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

