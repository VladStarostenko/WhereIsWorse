import React, { useState, Component } from "react";
import day from "../../images/day.jpg";
import night from "../../images/night.jpg";

const DayWeather = props => {
  let [displayDiv, setDisplayDiv] = useState(true);
  const setCurTime = (weather) => {
    let curTime = parseInt(weather.dt_txt.slice(11,13)) + props.city.timezone/3600;
    if(curTime < 0) {
      curTime += 24;
    } else if (curTime > 24) {
      curTime -=24;
    }
    return curTime;
  }
  return (
    <tr>
      <td>
        {props.weather.dt_txt.slice(0,10) + " "}
        {setCurTime(props.weather) }
        <button
          onClick={() => {
            setDisplayDiv(!displayDiv);
          }}
          className="btn btn-primary float-right"
          type="button"
          style={{
            "margin-left": "0",
            "margin-right": "50px",
            "margin-top": "-5px"
          }}
        >
          Zobacz pogodę
        </button>
        <div
          className={displayDiv ? "d-none" : undefined}
          style={{ "margin-top": "15px" }}
        >
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td>{props.weather.main.temp}</td>
                  <td>{props.weather.main.feels_like}</td>
                  <td>{props.weather.main.pressure}</td>
                  <td>{props.weather.wind.speed}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  );
};

class WeekPage extends React.Component {
  setTime() {
    let curTime = parseInt(this.props.arrayWeather[0].dt_txt.slice(11,13)) + this.props.city.timezone/3600;
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
    let elementDayWeather = this.props.arrayWeather.map(weather => (
      <DayWeather
        key={this.props.arrayWeather.indexOf(weather)}
        weather={weather}
        city = {this.props.city}
      />
    ));

    return (
      <>
        <main className="page landing-page" style={{ "padding-top": "70px", paddingBottom:"70px", backgroundSize: "100%", backgroundImage: `url(${this.setTime()})`}}>
          <section
            className="clean-block clean-info dark"
            style={{ "padding-bottom": "10px", "margin": "70px" }}
          >
            <div className="container">
              <div>
                <h3
                  className="text-center"
                  style={{
                    "margin-top": "15px",
                    "margin-bottom": "15px",
                    "padding-top": "5px",
                    "padding-bottom": "5px"
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
        <footer className="page-footer dark" style={{ "padding-top": "0px" }}>
          <div className="footer-copyright" style={{ "margin-top": "0px" }}>
            <p>© 2019 Bad_Weather</p>
          </div>
        </footer>
      </>
    );
  }
}

export default WeekPage;
