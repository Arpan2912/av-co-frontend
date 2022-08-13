import React from 'react';
import { createRoot } from 'react-dom/client';
import {  Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

serviceWorker.unregister();
