import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'; // or PropTypes = require('prop-types');
import AuthService from '../services/AuthService';
import StorageService from '../services/StorageService';
/**
 * private route component to prevent unauthorize access
 */
const PrivateRoutes = ({ component: Component, ...rest }) => {
  const token = StorageService.getToken();
  let isAuthenticated = false;
  if (token) {
    isAuthenticated = true
  } else {
    isAuthenticated = false

  }

  return (
    <Route
      {...rest}
      render={props =>
        // if user is authenticated successfully then redirect to component or
        // redirect to login page
        (
          isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
              pathname: '/',
            }}
            />
        )

      }
    />
  );
};

PrivateRoutes.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoutes;
