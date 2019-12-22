import React, { useState, Component } from "react";
import day from "../../images/day.jpg";
import night from "../../images/night.jpg";


const Weather = props => {
  return (
    <div className="table-responsive">
      <table className="table">
        <tbody>
        <tr>
          <td>{props.weather.dt_txt.slice(11,16)}</td>
          <td>{Math.round(props.weather.main.temp-273.15) + " C"}</td>
          <td>{Math.round(props.weather.main.feels_like-273.15) + " C"}</td>
          <td>{props.weather.main.pressure + " hPa"}</td>
          <td>{props.weather.wind.speed + " m/s"}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

const DayWeather = props => {

  let elementWeather = props.weather.map(weather => (
    <Weather
      key={props.weather.indexOf(weather)}
      weather={weather}
    />
  ));

  let [displayDiv, setDisplayDiv] = useState(true);
  return (
    <tr>
      <td>
        {props.weather[0].dt_txt.slice(0,10)}
        <button
          onClick={() => {
            setDisplayDiv(!displayDiv);
          }}
          className="btn btn-primary float-right"
          type="button"
          style={{
            marginLeft: "0",
            marginRight: "50px",
            marginTop: "-5px"
          }}
        >
          Zobacz pogodę
        </button>
        <div
          className={displayDiv ? "d-none" : undefined}
          style={{ marginTop: "15px" }}
        >
          <div className="table-responsive">
            <table className="table">
              <tbody>
              <tr>
                <td>Godzina:</  td>
                <td>Temperatura:</td>
                <td>Odczuwalna:</td>
                <td>Ciśnienie:</td>
                <td>Wiatr:</td>
              </tr>
              </tbody>
            </table>
          </div>
          {elementWeather}
        </div>
      </td>
    </tr>
  );
};

class WeekPage extends React.Component {
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

  render() {
    if(!(this.props.arrayWeather && this.props.currentWeather)){
      return <div></div>
    }

    const getDates = () => {
      let dates = []
      let dateForecast = [];
      let date = this.props.arrayWeather[0].dt_txt.slice(0,10);
      for(let j = 0; j < this.props.arrayWeather.length; j++) {
        for (let i = j; i < this.props.arrayWeather.length; i++) {
          if (this.props.arrayWeather[i].dt_txt.slice(0, 10) === date) {
            dateForecast.push(this.props.arrayWeather[i])
            if(i === this.props.arrayWeather.length-1){
              dates.push(dateForecast)
              return dates
            }
          }else{
            if(i+1 < this.props.arrayWeather.length) {
              date = this.props.arrayWeather[i].dt_txt.slice(0, 10)
              j = i-1;
            }
            break
          }
        }
        if(dateForecast.length !== 0) {
          dates.push(dateForecast)
          dateForecast = []
        }
      }
      return dates
    }

    const dates = getDates()

    let elementDayWeather = dates.map(weather => (
      <DayWeather
        key={dates.indexOf(weather)}
        weather={weather}
      />
    ));

    return (
      <>
        <main className="page landing-page" style={{ paddingTop: "70px", paddingBottom:"70px", backgroundSize: "100%", backgroundImage: `url(${this.setTime()})`}}>
          <section
            className="clean-block clean-info dark"
            style={{ paddingBottom: "10px", "margin": "70px" }}
          >
            <div className="container">
              <div>
                <h3
                  className="text-center"
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                  }}
                >
                  Wybierz date{" "}
                </h3>
                <div className="table-responsive">
                  <table className="table">
                <tbody className="text-center">{elementDayWeather}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="page-footer dark" style={{ paddingTop: "0px" }}>
          <div className="footer-copyright" style={{ marginTop: "0px" }}>
            <p>© 2019 Bad_Weather</p>
          </div>
        </footer>
      </>
    );
  }
}

export default WeekPage;
