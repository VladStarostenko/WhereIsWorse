import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/redux-store';

export let callSubscriber =()=> {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>, document.getElementById('root')
  );
};

callSubscriber();

store.subscribe(()=> {
  callSubscriber();
});

serviceWorker.unregister();
