import { weatherAPI } from "./../api/api";
const SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER";
const SET_FORECAST_WEATHER = "SET_FORECAST_WEATHER";
const UPDATE_ARRAY_CITY ="UPDATE_ARRAY_CITY";
export const setCurrentWeather = currentWeather => ({
    type: SET_CURRENT_WEATHER,
    currentWeather: currentWeather
});
export const setForecastWeather = forecastWeather => ({
    type: SET_FORECAST_WEATHER,
    forecastWeather: forecastWeather
});

export const updateArrayCity = arrayCity => ({
    type: UPDATE_ARRAY_CITY,
    arrayCity: arrayCity
});
let initialState = {
    city: null,
    arrayWeather: null,
    currentWeather: null,
    arrayCity:[
        {name:"Hong Kong", temp: null},
        {name:"Singapore", temp: null},
        {name:"London", temp: null},
        {name:"Macau", temp: null},
        {name:"Bangkok", temp: null},
        {name:"Antalya", temp: null},
        {name:"Kuala Lumpur", temp: null},
        {name:"New York", temp: null},
        {name:"Paris", temp: null},
        {name:"Istanbul", temp: null},
        {name:"Dubai", temp: null},
        {name:"Mecca", temp: null},
        {name:"Miami", temp: null},
        {name:"Rome", temp: null},
        {name:"Shanghai", temp: null},
        {name:"Barcelona", temp: null},
        {name:"Las Vegas", temp: null},
        {name:"Cairo", temp: null},
        {name:"Beijing", temp: null},
        {name:"Los Angeles", temp: null},
        {name:"Cancún", temp: null},
        {name:"Delhi", temp: null},
        {name:"Brussels", temp: null},
        {name:"Mumbai", temp: null},
        {name:"Bucharest", temp: null},
        {name:"Aleppo", temp: null},
        {name:"Munich", temp: null},
        {name:"Marrakech", temp: null},
        {name:"Mexico City", temp: null},
        {name:"Jakarta", temp: null},
        {name:"Vancouver", temp: null},
        {name:"Auckland", temp: null},
        {name:"Rio de Janeiro", temp: null},
        {name:"Lima", temp: null},
        {name:"Milan", temp: null},
        {name:"Seattle", temp: null},
        {name:"Lisbon", temp: null},
        {name:"Eastern Province", temp: null},
        {name:"Sao Paulo", temp: null},
        {name:"Agra", temp: null},
        {name:"Pattaya", temp: null},
        {name:"Amsterdam", temp: null},
        {name:"Tokyo", temp: null},
        {name:"Prague", temp: null},
        {name:"Moscow", temp: null},
        {name:"Phuket", temp: null},
        {name:"Dublin", temp: null},
        {name:"Punta Cana", temp: null},
        {name:"Vienna", temp: null},
        {name:"Madrid", temp: null},
        {name:"Kiev", temp: null},
        {name:"Orlando", temp: null},
        {name:"Taipei", temp: null},
        {name:"Mugla", temp: null},
        {name:"San Francisco", temp: null},
        {name:"Edirne", temp: null},
        {name:"Toronto", temp: null},
        {name:"Berlin", temp: null},
        {name:"Seoul", temp: null},
        {name:"Chennai", temp: null},
        {name:"Guangzhou", temp: null},
        {name:"Sydney", temp: null},
        {name:"Jaipur", temp: null},
        {name:"Johannesburg", temp: null},
        {name:"Chiang Mai", temp: null},
        {name:"Shenzhen", temp: null},
        {name:"Christchurch", temp: null},
        {name:"Hangzhou", temp: null},
        {name:"Athens", temp: null},
        {name:"Venice", temp: null},
        {name:"Florence", temp: null},
        {name:"Honolulu", temp: null},
        {name:"Abu Dhabi", temp: null},
        {name:"Halong", temp: null},
        {name:"Washington", temp: null},
        {name:"Burgas", temp: null},
        {name:"Riyadh", temp: null},
        {name:"Varna", temp: null},
        {name:"Cape Town", temp: null},
        {name:"Melbourne", temp: null},
        {name:"Cairo", temp: null},
        {name:"Edinburgh", temp: null},
        {name:"Minsk", temp: null},
        {name:"Suzhou", temp: null},
        {name:"Budapest", temp: null},
        {name:"Denpasar", temp: null},
        {name:"Antalya", temp: null},
        {name:"Buenos Aires", temp: null},
        {name:"St Petersburg", temp: null},
        {name:"Damascus", temp: null},
        {name:"Warsaw", temp: null},
        {name:"Hanoi", temp: null},
        {name:"Zurich", temp: null},
        {name:"Sharjah", temp: null},
        {name:"Pyongyang", temp: null},
        {name:"Algiers", temp: null},
        {name:"Chicago", temp: null},
        {name:"Krabi", temp: null},
        {name:"Queenstown", temp: null},
        {name:"Manila", temp: null},
    ]
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
        case UPDATE_ARRAY_CITY:
            return {
                ...state,
                arrayCity: action.arrayCity,

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

export const getCurrentTempCity=(arrayCity)=> {
    return dispatch => {
        for(let i=0;i<100;i++) {
            weatherAPI.getWeatherCity(arrayCity[i].name).then(res=> {
                arrayCity[i].temp=Math.round(res.data.main.temp-273.15);
            })
        }
        dispatch(updateArrayCity(arrayCity));
    }
}


export default WeatherReducer;
