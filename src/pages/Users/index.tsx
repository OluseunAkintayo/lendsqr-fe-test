import React from 'react';
import axios from 'axios';
import Card from './Card';
import './users.scss';
import { Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

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

const Users: () => JSX.Element = () => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<any>(null);
	const [users, setUsers] = React.useState<UserProps[] | null>(null);
	const getUsers = async (): Promise<void> => {
		setLoading(true);
		const URL = "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";
		const config = { url: URL, method: 'GET' };
		try {
			const response = await axios.request(config);
			if(response.status === 200) {
				setUsers(response?.data);
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


	const saveUser = (user: UserProps): void => localStorage.setItem('user', JSON.stringify(user));

	React.useEffect((): void => {
		getUsers();
	}, []);

	// filter menu
	const [filterMenu, setFilterMenu] = React.useState<null | HTMLElement>(null);
	const openFilterMenu = (e: React.MouseEvent<HTMLElement>) => setFilterMenu(e.currentTarget);

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
									</TableRow>
								</TableHead>
								<TableBody>
									{users
										.sort((a: UserProps, b: UserProps) => a.userName.localeCompare(b.userName))
										.map((user: UserProps) => (
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
										</TableRow>
									))}
								</TableBody>
							</Table>
						)
					}
				</TableContainer>
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
					<form className="users__filter">
						<div className="filter__formItem">
							<label htmlFor="org">Organization</label>
							<input type="text" list="organization" placeholder='Select' />
							<datalist id="organization">
								<option value="First Org" />
								<option value="second Org" />
							</datalist>
						</div>
						<div className="filter__formItem">
							<label htmlFor="username">Username</label>
							<input name="username" placeholder="User" />
						</div>
						<div className="filter__formItem">
							<label htmlFor="email">Email</label>
							<input name="email" placeholder="Email" />
						</div>
						<div className="filter__formItem">
							<label htmlFor="date">Date</label>
							<input name="date" placeholder="Date" type="date" />
						</div>
						<div className="filter__formItem">
							<label htmlFor="phone">Phone</label>
							<input name="phone" placeholder="Phone Number" />
						</div>
						<div className="filter__formItem">
							<label htmlFor="status">Phone</label>
							<select className="filter__formItem">
								<option>Select</option>
								<option>Active</option>
								<option>Blacklisted</option>
								<option>Inactive</option>
								<option>Pending</option>
							</select>
						</div>
						<div className="filter__btnRow">
							<button type="button">Reset</button>
							<button type="button">Filter</button>
						</div>
					</form>
				</Menu>
			</React.Fragment>
		</div>
	)
}

export default Users;