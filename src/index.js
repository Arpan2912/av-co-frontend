import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import './index.css';
import App from './App';    
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import store from './store';

ReactDOM.render(
  // Provider is root component for app because of redux
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
