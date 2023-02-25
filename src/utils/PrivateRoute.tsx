import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout';

type Props = {};

const PrivateRoute = (props: Props) => {
	const token = localStorage.getItem('token');
	return (
		token ? <Layout><Outlet /></Layout> : <Navigate to="/auth/login" />
	)
}

export default PrivateRoute;