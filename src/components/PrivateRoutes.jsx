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
  let isCompanySelected = true;
  if (token) {
    isAuthenticated = true
  } else {
    isAuthenticated = false

  }
  const compnayDetail = StorageService.getCompanyDetail();
  if (!compnayDetail && rest.path !== '/company') {
    isCompanySelected = false;
  }
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated === true) {
          if (isCompanySelected) {
            return <Component {...props} />
          } else {
            return <Redirect to={{
              pathname: '/company',
            }}
            />
          }
        } else {
          return <Redirect to={{
            pathname: '/',
          }}
          />
        }
      }

      }
    />
  );
};

PrivateRoutes.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoutes;
