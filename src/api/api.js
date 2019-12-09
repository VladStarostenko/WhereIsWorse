import * as axios from "axios";
const instance = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/"
});
const API_KEY = "98c0428b737f3d8ac7afd1c061e79afc";
export const weatherAPI = {
  getWeatherLatLng(lat, lng) {
    return instance
      .get(`weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}`)
      .then(response => {
        return response;
      });
  },
  getWeatherCity(city) {
    return instance
      .get(`weather?q=${city}&APPID=${API_KEY}`)
      .then(response => {
        return response;
      });
  },
  getWeatherForecastLatLng(lat,lng) {
    return instance
      .get(`forecast?lat=${lat}&lon=${lng}&APPID=${API_KEY}`)
      .then(response => {
        return response;
      });
  }
};
