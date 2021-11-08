import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import {Provider} from 'react-redux';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/Article-List.css';
import './assets/css/Contact-Form-Clean.css';
import './assets/css/Navigation-Clean.css';
import './assets/css/Navigation-with-Button.css';
import './assets/css/Login-Form-Clean.css';
import './assets/css/styles.css';

import App from './App';
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


