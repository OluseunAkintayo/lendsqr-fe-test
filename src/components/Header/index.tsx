import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
	const userName = localStorage.getItem('username');
	const [user, setUser] = React.useState<string>('');
	React.useEffect(() => {
		if(userName) setUser(userName);
	}, [userName]);

	return (
		<header className="header">
			<div className="header__logoContainer">
				<Link to="/">
					<img src="/img/logo.svg" alt="Logo" />
				</Link>
			</div>
			<div className="header__right">
				<div className="header__searchBar">
					<input type="text" placeholder="Search for anything" />
					<div>
						<img src="/icons/search.svg" alt="Search" />
					</div>
				</div>
				<div className="header__userMenu">
					<a href="#" className="header__linkText">Docs</a>
					<img src="/icons/notification.png" alt="notifications" className="header__notifications__icon" />
					<img src="/img/avatar.png" alt="avatar" className="header__notifications__avatar" />
					<div className="header__userName">
						<p>{user}</p>
						<span>&#9660;</span>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header;