const SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER";
const SET_FORECAST_WEATHER = "SET_FORECAST_WEATHER";
const SET_COORDINATES = "SET_COORDINATES";

export const setCurrentWeather = currentWeather => ({
  type: SET_CURRENT_WEATHER,
  currentWeather: currentWeather
});
export const setForecastWeather = forecastWeather => ({
  type: SET_FORECAST_WEATHER,
  forecastWeather: forecastWeather
});

export const setCoordinates = (lat, lng) => ({
  type: SET_COORDINATES,
  lat: lat,
  lng: lng
});

let initialState = {
  lat: 52.22016819175321,
  lng: 21.01126131859803,
  currentWeather: null,
  forecastWeather: null
};

const MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.currentWeather
      };
    case SET_FORECAST_WEATHER:
      return {
        ...state,
        forecastWeather: action.forecastWeather
      };
    case SET_COORDINATES:
      return {
        ...state,
        lat: action.lat,
        lng: action.lng
      };
    default:
      return state;
  }
};

export default MapReducer;
