import React from 'react';
import axios from 'axios';
import Card from './Card';
import { Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './users.scss';
// import Paginate from './Paginate';

type UserProps = {
	createdAt: string;
	orgName: string;
	userName: string;
	email: string;
	phoneNumber: string;
	lastActiveDate: string;
	profile: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		avatar: string;
		gender:string;
		bvn: string;
		address: string;
		currency: string;
	},
	guarantor: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		gender: string;
		address: string;
	},
	accountBalance: string;
	accountNumber: string;
	socials: {
		facebook: string;
		instagram:string;
		twitter: string;
	},
	education: {
		level: string;
		employmentStatus: string;
		sector: string;
		duration: string;
		officeEmail: string;
		monthlyIncome: string[];
		loanRepayment: string;
	},
	id: string;
}

type BankProps = {
	name: string;
}
type OrgProps = {
	name: string;
}
type UsernameProps = {
	name: string;
}

const Users: () => JSX.Element = () => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<any>(null);
	
	// handle user table pagination
	let [users, setUsers] = React.useState<UserProps[] | null>([]);
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
	const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => setRowsPerPage(Number(e.target.value));
	const lastItemIndex = currentPage * rowsPerPage;
	const firstItemIndex = lastItemIndex - rowsPerPage;
	let currentItems = users?.slice(firstItemIndex, lastItemIndex);

	const paginate = (item: number) => setCurrentPage(item);
	const pageChange = (e: any) => setCurrentPage(e.selected + 1);

	// filter params
	const [filterMenu, setFilterMenu] = React.useState<null | HTMLElement>(null);
	const [organization, setOrganization] = React.useState<OrgProps[] | null>([]);
	const [filter, setFilter] = React.useState({ orgName: '', username: '', email: '', date: dayjs().format("YYYY-MM-DD"), phone: '', status: '' });
	const handleOrgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter({ ...filter, orgName: e.target.value });
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter({ ...filter, username: e.target.value });
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter({ ...filter, email: e.target.value });
	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter({ ...filter, date: e.target.value });
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter({ ...filter, phone: e.target.value });
	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFilter({ ...filter, status: e.target.value });
	const openFilterMenu = (e: React.MouseEvent<HTMLElement>) => setFilterMenu(e.currentTarget);

	const onSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		let { orgName, username, email, phone } = filter;
		let filteredData = users;
		if(filter.username.trim().length > 0 && filteredData) {
			filteredData = filteredData?.filter((item: UserProps) => item.userName.toLowerCase().includes(username.toLowerCase().trim()));
		}
		if(orgName.trim().length > 0 && filteredData) {
			filteredData = filteredData?.filter((item: UserProps) => item.orgName.toLowerCase().includes(orgName.toLowerCase().trim()));
		}
		if(email.trim().length > 0 && filteredData) {
			filteredData = filteredData?.filter((item: UserProps) => item.email.toLowerCase().includes(email.toLowerCase().trim()));
		}
		if(phone.trim().length > 0 && filteredData) {
			filteredData = filteredData?.filter((item: UserProps) => item.phoneNumber.toLowerCase().includes(phone.toLowerCase().trim()));
		}
		setUsers(filteredData);
		setFilterMenu(null);
	}

	const onReset = (): void => {
		setFilter({ orgName: '', username: '', email: '', date: dayjs().format("YYYY-MM-DD"), phone: '', status: '' });
		const retrievedUsers = localStorage.getItem('users') as string | null;
		if(retrievedUsers) setUsers(JSON.parse(retrievedUsers));
	}

	const openActionsMenu = (e: React.MouseEvent<HTMLElement>) => setActionsMenu(e.currentTarget);
	const closeActionsMenu = () => setActionsMenu(null);
	const [actionsMenu, setActionsMenu] = React.useState<null | HTMLElement>(null);


	const getData = async (): Promise<void> => {
		setLoading(true);
		const URL = "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";
		const config = { url: URL, method: 'GET' };
		try {
			const response = await axios.request(config);
			if(response.status === 200) {
				let data = response?.data.sort((a: UserProps, b: UserProps) => a.userName.localeCompare(b.userName));
				localStorage.setItem('users', JSON.stringify(data));
				setUsers(data);
				const orgData = response.data.map((item: UserProps) => {
					return { name: item.orgName };
				});
				setOrganization(orgData);
				setLoading(false);
			} else {
				setError("Unable to load users");
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError(error);
		}
	}

	const getBanks = async (): Promise<void> => {
		const URL: string = "https://nigerianbanks.xyz/";
		try {
			const response = await axios.get(URL);
			if(response.status === 200) {
				let banks = response.data.map((item: BankProps) => {
					return {
						name: item.name
					}
				});
				localStorage.setItem('banks', JSON.stringify(banks));
			}
		} catch (error) {
			console.log(error);
		}
	}

	React.useEffect(() => {
		getBanks();
	}, []);

	React.useEffect((): void => {
		getData();
	}, []);

	const saveUser = (user: UserProps): void => localStorage.setItem('user', JSON.stringify(user));

	React.useEffect((): () => void => {
		document.title = "Users - Lendsqr";
		return () => null;
	}, []);

	return (
		<div className="users__container">
			<h2 className="page__title">Users</h2>
			<div className="cards_row">
				<Card icon="/icons/users-dashboard.png" title="Users" value={2453} />
				<Card icon="/icons/active-users-dashboard.png" title="Active Users" value={2453} />
				<Card icon="/icons/loans-users-dashboard.png" title="Users with loans" value={12453} />
				<Card icon="/icons/savings-users-dashboard.png" title="Users with savings" value={102453} />
			</div>
			<div className="users__tableWrapper">
			{/* <Paginate
				rowsPerPage={rowsPerPage}
				totalCount={tempUsers ? tempUsers?.length : 0}
				paginate={paginate}
				currentPage={currentPage}
			/> */}
				<TableContainer component={Paper} className="mui__table__container">
					{
						loading ?
						<div className="loadingContainer">
							<div className="loading" />
						</div>
						: (
							error ?
							<div className="loadingContainer">An error has occurred</div>
							: (!loading && users) &&
							<Table stickyHeader aria-label="users table">
								<TableHead>
									<TableRow>
											<TableCell>
												<div className="users__tableColumnTitle">
													<span className="users__tableColumnTitleText">organization</span>
													<img src="/icons/filter-icon.png" draggable="false" className="users__tableColumnTitleIcon" onClick={openFilterMenu} />
												</div>
											</TableCell>
											<TableCell>
												<div className="users__tableColumnTitle">
													<span className="users__tableColumnTitleText">username</span>
													<img src="/icons/filter-icon.png" draggable="false" className="users__tableColumnTitleIcon" onClick={openFilterMenu} />
												</div>
											</TableCell>
											<TableCell>
												<div className="users__tableColumnTitle">
													<span className="users__tableColumnTitleText">email</span>
													<img src="/icons/filter-icon.png" draggable="false" className="users__tableColumnTitleIcon" />
												</div>
											</TableCell>
											<TableCell>
												<div className="users__tableColumnTitle">
													<span className="users__tableColumnTitleText">phone number</span>
													<img src="/icons/filter-icon.png" draggable="false" className="users__tableColumnTitleIcon" />
												</div>
											</TableCell>
											<TableCell>
												<div className="users__tableColumnTitle">
													<span className="users__tableColumnTitleText">date joined</span>
													<img src="/icons/filter-icon.png" draggable="false" className="users__tableColumnTitleIcon" />
												</div>
											</TableCell>
											<TableCell>
												<div className="users__tableColumnTitle">
													<span className="users__tableColumnTitleText">status</span>
													<img src="/icons/filter-icon.png" draggable="false" className="users__tableColumnTitleIcon" />
												</div>
											</TableCell>
											<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									{currentItems &&
									currentItems.map((user: UserProps) => (
										<TableRow className="users__tableCellRow" key={user.id}>
											<TableCell>
												<div className="users__tableCellContent">{user.orgName}</div>
											</TableCell>
											<TableCell>
												<div className="users__tableCellContent">
													<Link to={`/users/${user.id}`} onClick={() => saveUser(user)}>{user.userName}</Link>
												</div>
											</TableCell>
											<TableCell>
												<div className="users__tableCellContent">{user.email}</div>
											</TableCell>
											<TableCell>
												<div className="users__tableCellContent expanded-cellWidth">{user.phoneNumber}</div>
											</TableCell>
											<TableCell>
												<div className="users__tableCellContent expanded-cellWidth">{dayjs(user.createdAt).format("MMM D, YYYY h:mm A")}</div>
											</TableCell>
											<TableCell className="action-btn">
												<button
													className={
														dayjs(user.lastActiveDate) < dayjs().subtract(3, 'month') ? "btn-inactive" : (
															dayjs(user.createdAt) > (dayjs().set('year', 2030) && dayjs().set('year', 2050)) ? "btn-pending" : (
																dayjs(user.createdAt) > dayjs().set('year', 2090) ? "btn-blacklisted" : "btn-active"
															)
														)
													}
												>
													{
														dayjs(user.lastActiveDate) < dayjs().subtract(3, 'month') ? "Inactive" : (
															dayjs(user.createdAt) > (dayjs().set('year', 2030) && dayjs().set('year', 2050)) ? "Pending" : (
																dayjs(user.createdAt) > dayjs().set('year', 2090) ? "Blacklisted" : "Active"
															)
														)
													}
												</button>
											</TableCell>
											<TableCell>
												<div className="users__tableCellContent"><img src="/icons/more-vert.png" onClick={openActionsMenu} /></div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)
					}
				</TableContainer>
				<div className="users__tableFooter">
					<div className="rowsCount">
						<span>Showing</span>
						<select className="rowsCount__select" onChange={handleRowsChange}>
							{ [10, 20, 30, 50].map((item: number) => (<option key={item} value={item}>{item}</option>)) }
						</select>
						<span>of {users?.length}</span>
					</div>
					<ReactPaginate
						onPageChange={pageChange}
						pageCount={users ? Math.ceil(users?.length / rowsPerPage) : 0}
						previousLabel={"<"}
						nextLabel={">"}
						containerClassName={"react-paginate"}
						pageLinkClassName={"react-paginate-item"}
						activeClassName={"currentPage"}
					/>
				</div>
			</div>
			<React.Fragment>
				<Menu
					keepMounted
					sx={{ mt: '12px', ml: -4, boxShadow: 0 }}
					anchorEl={filterMenu}
					open={Boolean(filterMenu)}
					onClose={() => setFilterMenu(null)}
					anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
					transformOrigin={{ vertical: 'top', horizontal: 'left' }}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.02)',
							border: '1px solid rgba(84, 95, 125, 0.14)',
							mt: 1, p: 2, width: '270px',
							background: '#FFFFFF',
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							}
						},
					}}
				>
					<form className="users__filter" onSubmit={onSubmit} autoComplete="off">
						<div className="filter__formItem">
							<label htmlFor="org">Organization</label>
							<input type="text" list="organization" placeholder='Select' onChange={handleOrgNameChange} value={filter.orgName} />
							<datalist id="organization">
								{organization?.map((item: OrgProps) => (<option value={item.name} key={item.name} />))}
							</datalist>
						</div>
						<div className="filter__formItem">
							<label htmlFor="username">Username</label>
							<input name="username" placeholder="User" onChange={handleUsernameChange} value={filter.username} />
						</div>
						<div className="filter__formItem">
							<label htmlFor="email">Email</label>
							<input name="email" placeholder="Email" onChange={handleEmailChange} value={filter.email} />
						</div>
						<div className="filter__formItem">
							<label htmlFor="date">Date</label>
							<input name="date" placeholder="Date" type="date" onChange={handleDateChange} value={filter.date} />
						</div>
						<div className="filter__formItem">
							<label htmlFor="phone">Phone</label>
							<input name="phone" placeholder="Phone Number" onChange={handlePhoneChange} value={filter.phone} />
						</div>
						<div className="filter__formItem">
							<label htmlFor="status">Status</label>
							<select className="filter__formItem" onChange={handleStatusChange} value={filter.status}>
								<option>Select</option>
								<option>Active</option>
								<option>Blacklisted</option>
								<option>Inactive</option>
								<option>Pending</option>
							</select>
						</div>
						<div className="filter__btnRow">
							<button type="button" onClick={onReset}>Reset</button>
							<button type="submit">Filter</button>
						</div>
					</form>
				</Menu>
				{/* actions menu */}
				<Menu
					keepMounted
					sx={{ mt: '12px', ml: -4, boxShadow: 0 }}
					anchorEl={actionsMenu}
					open={Boolean(actionsMenu)}
					onClose={() => setActionsMenu(null)}
					anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
					transformOrigin={{ vertical: 'top', horizontal: 'left' }}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.02)',
							border: '1px solid rgba(84, 95, 125, 0.14)',
							mt: 1, minWidth: '60px',
							background: '#FFFFFF'
						}
					}}
				>
					<div className="actions__menu">
						<span onClick={closeActionsMenu}>View Details</span>
						<span onClick={closeActionsMenu}>Blacklist User</span>
						<span onClick={closeActionsMenu}>Activate User</span>
					</div>
				</Menu>
			</React.Fragment>
		</div>
	)
}

export default Users;