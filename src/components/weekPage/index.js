import React, { useState, Component } from "react";

const DayWeather = props => {
  let [displayDiv, setDisplayDiv] = useState(true);
  return (
    <tr>
      <td>
        {props.weather.dt_txt}
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
  //   componentDidMount() {
  //       this.test();
  //   }
  //   test=()=> {
  //     let counter = 0;
  //     const checkArray = arrayWeather => {
  //       let arrayWeatherNEEEEEEEEEW = [];
  //       let dataWeather = arrayWeather[counter].dt_txt;
  //       for (let i = counter; i < arrayWeather.length; i++) {
  //         if (arrayWeather[i].dt_txt.slice(8, 10) === dataWeather.slice(8, 10)) {
  //           arrayWeatherNEEEEEEEEEW.push(arrayWeather[i]);
  //           counter++;
  //         }
  //       }
  //       console.log(counter);
  //       return arrayWeatherNEEEEEEEEEW;
  //     };
  //     let tmp;
  //     while (counter < this.props.arrayWeather.length) {
  //       tmp = checkArray(this.props.arrayWeather);
  //       console.log(counter);
  //       console.log(tmp[0].dt_txt);
  //     }
  //   }

  render() {
    let elementDayWeather = this.props.arrayWeather.map(weather => (
      <DayWeather
        key={this.props.arrayWeather.indexOf(weather)}
        weather={weather}
      />
    ));

    return (
      <>
        <main className="page landing-page" style={{ "padding-top": "70px" }}>
          <section
            className="clean-block clean-info dark"
            style={{ "padding-bottom": "10px" }}
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
