import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import mapReducer from './mapReducer';
import mainPageReducer from './mainPageReducer';
import WeatherReducer from './weatherReducer';

let reducers = combineReducers({
  map: mapReducer,
  mainPage: mainPageReducer,
  weather: WeatherReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;
