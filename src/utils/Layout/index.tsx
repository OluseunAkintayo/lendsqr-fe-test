import React, { ReactNode } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './layout.scss';

type Props = {
	children: ReactNode;
}

const Layout = (props: Props) => {
	return (
		<React.Fragment>
			<Header />
			<div className="layout__body">
				<Sidebar />
				<main className="layout__children">{ props.children }</main>
			</div>
		</React.Fragment>
	)
}

export default Layout;