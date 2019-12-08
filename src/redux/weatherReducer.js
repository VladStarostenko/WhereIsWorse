import { weatherAPI } from "./../api/api";
const SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER";
const SET_FORECAST_WEATHER = "SET_FORECAST_WEATHER";
export const setCurrentWeather = currentWeather => ({
    type: SET_CURRENT_WEATHER,
    currentWeather: currentWeather
});
export const setForecastWeather = forecastWeather => ({
    type: SET_FORECAST_WEATHER,
    forecastWeather: forecastWeather
});

let initialState = {
    city: null,
    arrayWeather: null,
    currentWeather: null
};

const WeatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_WEATHER:
            return {
                ...state,
                currentWeather: action.currentWeather
            };
        case SET_FORECAST_WEATHER:
            console.log(action.forecastWeather.city);
            return {
                ...state,
                city: action.forecastWeather.city,
                arrayWeather: action.forecastWeather.list
            };
        default:
            return state;
    }
};

export const getCurrentWeather = (lat, lng) => {
    return dispatch => {
        weatherAPI.getWeatherLatLng(lat, lng).then(request => {
            console.log(request.data);
            dispatch(setCurrentWeather(request.data));
        });
    };
};

export const getForecastWeather = (lat, lng) => {
    return dispatch => {
        weatherAPI.getWeatherForecastLatLng(lat, lng).then(request => {
            console.log(request.data);
            dispatch(setForecastWeather(request.data));
        });
    };
};

export default WeatherReducer;
