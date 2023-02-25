import React from 'react';
import './users.scss';

type Props = {
	icon: string;
	title: string;
	value: number;
}

const Card = ({ icon, title, value }: Props) => {
	return (
		<div className="card__container">
			<div className="card__content_wrapper">
				<img src={icon} />
				<p className="card__title">{title}</p>
				<p className="card__value">{value.toLocaleString()}</p>
			</div>
		</div>
	)
}

export default Card