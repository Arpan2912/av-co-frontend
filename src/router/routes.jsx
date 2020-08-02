import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

import PrivateRoute from '../components/PrivateRoutes';
import { publicRouteObj, privateRouteObj } from './router-config';
// import PrivateRoute from '../component/private-route/PrivateRoute';


let privateRoutes = privateRouteObj;

class Routes extends Component {

    componentWillReceiveProps(nextProps) {
        console.log("Router config", nextProps);
        // privateRoutes = privateRouteObj.filter(route => {
        //     return true;
        // })
    }

    render() {
        const publicRoutesObj = publicRouteObj.map(route => (
            <Route key={route.key} exact={route.exact} path={route.path} component={route.component} />
        ));

        const privateRoutesObj = privateRoutes.map(route => (
            <PrivateRoute
                key={route.key}
                exact={route.exact}
                path={route.path}
                component={route.component}
            />
        ));
        return (
            <Switch>
                {publicRoutesObj}
                {privateRoutesObj}
                {/* if user enter wrong path redirect to home page */}
                <Redirect from="*" to="/" />
            </Switch>
        );
    }
}

const mapStateToProps = state => ({
    route: state.routeReducer
})

// export default connect(mapStateToProps, null)(Routes);
// export default (withRouter(Routes));
export default Routes;
