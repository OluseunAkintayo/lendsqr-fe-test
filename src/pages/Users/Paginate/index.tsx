import React from 'react';
import './paginate.scss';


type Props = {
	rowsPerPage: number;
	totalCount: number;
	currentPage: number;
	paginate: (arg0: number) => void;
}

const Paginate = (props: Props) => {
	const { rowsPerPage, totalCount, paginate, currentPage } = props;
	const pageNumbers: number[] = [];
	for (let i = 1; i < Math.ceil(totalCount / rowsPerPage); i++) {
		pageNumbers.push(i);
	}

	const prev = () => {
		if(currentPage !== 1) paginate(currentPage - 1);
	}
	const next = () => {
		if(currentPage !== totalCount) paginate(currentPage + 1);
	}

	return (
		<div className="paginate__container">
			<ul className="pagination">
				<li className="prev" onClick={prev}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" fill="#213F7D" /></svg>
				</li>
				{pageNumbers.map((item: number) => (
					<li key={item} onClick={() => paginate(item)} className={currentPage === item ? "pagination-item currentPage" : "pagination-item"}>{item}</li>
				))}
				<li className="next" onClick={next}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" fill="#213F7D" /></svg>
				</li>
			</ul>
		</div>
	)
}

export default Paginate;