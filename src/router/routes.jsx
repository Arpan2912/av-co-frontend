import React, { Component } from 'react';
import { Route, Routes, Navigate, withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import Login from '../pages/Login/Login';
import { publicRouteObj, privateRouteObj } from './router-config';
import Contact from '../pages/Contact/Contact';
import Protected from '../components/Protected';
// import PrivateRoute from '../component/private-route/PrivateRoute';


let privateRoutes = privateRouteObj;

const CustomRoutes = () => {
	const publicRoutesObj = publicRouteObj.map(route => {
		const Component = route.component;
		return <Route key={route.key} exact={route.exact} path={route.path} element={<Component />} />
	});

	const privateRoutesObj = privateRoutes.map(route => {
		// const Component = RequiredAuth(route.component);
		const Component = route.component;
		return <Route
			key={route.key}
			exact={route.exact}
			path={route.path}
			element={
				<Protected page={route.key}>
					<Component />
				</Protected>
			}
		/>
	});


	return (
		<Routes>
			{publicRoutesObj}
			{privateRoutesObj}
			{/* if user enter wrong path redirect to home page */}
			{/* <Route path="contact" element={<Contact />} /> */}
			<Route path="*" element={<Login />} />
			{/* <Navigate from="*" to="/" /> */}
		</Routes >
	);
}

// export default connect(mapStateToProps, null)(Routes);
// export default (withRouter(Routes));
export default CustomRoutes;
