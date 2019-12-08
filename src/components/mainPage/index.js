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

// const Weather = props => {
//   return (
//     <div style={{backgroundColor: '#f6f6f6'}} className="col-md-6">
//       <h3 className="text-center">"Miasto"</h3>
//       <div className="getting-started-info">
//         <div className="table-responsive">
//           <table className="table">
//             <tbody className="text-center">
//             <Tr>
//               <Td className="text-center">Zaraz</Td>
//               <Td>12</Td>
//               <Td>13</Td>
//               <Td>14</Td>
//               <Td>15</Td>
//               <Td>16</Td>
//               <Td>17</Td>
//               <Td>18</Td>
//               <Td>19</Td>
//               <Td>20</Td>
//               <Td>21</Td>
//               <Td>22</Td>
//               <Td>23</Td>
//               <Td>24</Td>
//               <Td>1</Td>
//               <Td>2</Td>
//               <Td>3</Td>
//               <Td>4</Td>
//               <Td>5</Td>
//               <Td>6</Td>
//               <Td>7</Td>
//               <Td>8</Td>
//               <Td>9</Td>
//               <Td>10</Td>
//             </Tr>
//             <Tr>
//               <Td className="text-center">{props.temp}</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//               <Td>10*</Td>
//             </Tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div>
//         <div className="table-responsive">
//           <table className="table">
//             <tbody className="text-center">
//             <Tr>
//               <Td>Wiatr</Td>
//             </Tr>
//             <Tr>
//               <Td>Opady</Td>
//             </Tr>
//             <Tr>
//               <Td>Ciśnięcie</Td>
//             </Tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <button className="btn btn-outline-primary btn-lg text-center" type="button">Update</button>
//     </div>
//   );
// };

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
    this.props.getForecastWeather(latitude, longitude);
    this.props.setCoordinates(latitude, longitude);
  };

  searchButton = () => {
    const { latLng } = this.state;
    this.props.getForecastWeather(latLng.lat, latLng.lng);
  };
  updateLatLng = value => {
    this.setState({ latLng: value });
    this.props.setCoordinates(value.lat, value.lng);
  };

  render() {
    // let ElementWeather;
    // if (this.props.arrayWeather) {
    //   ElementWeather = this.props.arrayWeather.map(weather => (
    //     <div key={this.props.arrayWeather.indexOf(weather)}>
    //       <Weather
    //         data={weather.dt_txt}
    //         clouds={weather.clouds.all}
    //         temp={weather.main.temp}
    //         temp_max={weather.main.temp_max}
    //         temp_min={weather.main.temp_min}
    //         pressure={weather.main.pressure}
    //         humidity={weather.main.humidity}
    //         mainSky={weather.weather.main}
    //         sky={weather.weather.description}
    //         speed={weather.wind.speed}
    //         deg={weather.wind.deg}
    //       />
    //     </div>
    //   ));
    // } else {
    //   ElementWeather =
    //       <Weather
    //         data={null}
    //         clouds={null}
    //         temp={null}
    //         temp_max={null}
    //         temp_min={null}
    //         pressure={null}
    //         humidity={null}
    //         mainSky={null}
    //         sky={null}
    //         speed={null}
    //         deg={null}
    //       />
    // }

    return (
      <div>
        <main className="page landing-page" style={{paddingTop: '50px'}}>
          <section style={{paddingBottom: '10px', backgroundSize: "100%", backgroundImage: `url(${this.setTime()})`}}
                   className="clean-block clean-info dark">
            <div className="container">
              <Console
                updateData={this.updateData}
                searchButton={this.searchButton}
                updateLatLng={this.updateLatLng}
              />
              <div style={{margin: '0px'}} className="row align-items-center">
                <div className="col-md-6">
                  <MapContainer />
                </div>
                {/*{ElementWeather}*/}
                <div style={{backgroundColor: '#f6f6f6'}} className="col-md-6">
                  <h3 className="text-center">"Miasto"</h3>
                  <div className="getting-started-info">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody className="text-center">
                        <Tr>
                          <Td className="text-center">Zaraz</Td>
                          <Td>12</Td>
                          <Td>13</Td>
                          <Td>14</Td>
                          <Td>15</Td>
                          <Td>16</Td>
                          <Td>17</Td>
                          <Td>18</Td>
                          <Td>19</Td>
                          <Td>20</Td>
                          <Td>21</Td>
                          <Td>22</Td>
                          <Td>23</Td>
                          <Td>24</Td>
                          <Td>1</Td>
                          <Td>2</Td>
                          <Td>3</Td>
                          <Td>4</Td>
                          <Td>5</Td>
                          <Td>6</Td>
                          <Td>7</Td>
                          <Td>8</Td>
                          <Td>9</Td>
                          <Td>10</Td>
                        </Tr>
                        <Tr>
                          <Td className="text-center">10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
                          <Td>10*</Td>
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
                          <Td>Wiatr</Td>
                        </Tr>
                        <Tr>
                          <Td>Opady</Td>
                        </Tr>
                        <Tr>
                          <Td>Ciśnięcie</Td>
                        </Tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button className="btn btn-outline-primary btn-lg text-center" type="button">Update</button>
                </div>
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
                      <th>"Miasto 1"</th>
                      <th>"Miasto2"</th>
                      <th>"Miasto 3"</th>
                      <th>"Miasto 4"</th>
                      <th>"Miasto 5"</th>
                    </Tr>
                    </thead>
                    <tbody className="text-center">
                    <Tr>
                      <td>Temperarura</td>
                      <td>Temperarura</td>
                      <td>Temperarura</td>
                      <td>Temperarura</td>
                      <td>Temperarura</td>
                    </Tr>
                    <Tr>
                      <td>Opady</td>
                      <td>Opady</td>
                      <td>Opady</td>
                      <td>Opady</td>
                      <td>Opady</td>
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

