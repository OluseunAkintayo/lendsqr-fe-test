import React, { ReactNode } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './layout.scss';

type Props = {
	children: ReactNode;
}

const Layout = (props: Props) => {
	const openMenu = (): boolean | undefined => document.getElementById("nav__sidebar")?.classList.toggle("openMenu");
	return (
		<React.Fragment>
			<Header />
			<div className="layout__body">
				<div className="toggleMenu" onClick={openMenu}>
					<span />
					<span />
					<span />
				</div>
				<Sidebar />
				<main className="layout__children">{ props.children }</main>
			</div>
		</React.Fragment>
	)
}

export default Layout;