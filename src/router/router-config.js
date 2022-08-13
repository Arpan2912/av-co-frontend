// import { Home, About, Login, Logout, Users, Product, ForgotPassword, Exchanges, PaymentHistory } from '../containers';
// import Loadable from 'react-loadable';
// import { connect } from 'react-redux';

import Login from '../pages/Login/Login';
import Contact from '../pages/Contact/Contact';
import Stocks from '../pages/Stocks/Stocks';
import Transactions from '../pages/Transactions/Transactions';
import Dashboard from '../pages/Dashboard/Dashboard';
import Company from '../pages/Company/Company';
// Lazy loading sample code
// const Home = Loadable({
//   loader: () => import(/* webpackChunkName: "home" */ '../containers/Home'),
//   loading: () => <div>Loading...</div>,
// });


export const publicRouteObj = [
  {
    exact: true,
    path: '/',
    component: Login,
    key: 'Login',
  },
  // {
  //   exact: true,
  //   path: '/logout',
  //   component: Logout,
  //   key: 'Logout',
  // },
];

export const privateRouteObj = [
  {
    exact: true,
    path: '/contact',
    component: Contact,
    key: 'contact',
  },
  {
    exact: true,
    path: '/company',
    component: Company,
    key: 'company',
  },
  {
    exact: true,
    path: '/stocks',
    component: Stocks,
    key: 'Stocks',
  },
  {
    exact: true,
    path: '/transactions',
    component: Transactions,
    key: 'Transactions',
  },
  {
    exact: true,
    path: '/dashboard',
    component: Dashboard,
    key: 'Dashboard',
  }
];