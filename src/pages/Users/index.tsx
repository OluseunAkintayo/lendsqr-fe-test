import React from 'react';
import axios from 'axios';
import Card from './Card';
import './users.scss';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';

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
			console.log(response);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError(error);
		}
	}

	React.useEffect((): void => {
		getUsers();
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
				<TableContainer component={Paper} sx={{ minHeight: 440, maxHeight: 'calc(100vh - 400px - 3rem)', borderRadius: 2, boxShadow: '3px 5px 20px rgba(0, 0, 0, 0.04)' }}>
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
													<img src="/icons/filter-icon.png" draggable="false" className="users__tableColumnTitleIcon" />
												</div>
											</TableCell>
											<TableCell>
												<div className="users__tableColumnTitle">
													<span className="users__tableColumnTitleText">username</span>
													<img src="/icons/filter-icon.png" draggable="false" className="users__tableColumnTitleIcon" />
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
										// .sort((a: UserProps, b: UserProps) => a.orgName.localeCompare(b.orgName))
										.map((item: UserProps) => (
										<TableRow className="users__tableCellRow">
											<TableCell>
												<span className="users__tableCellContent">{item.orgName}</span>
											</TableCell>
											<TableCell>
												<span className="users__tableCellContent">{item.userName}</span>
											</TableCell>
											<TableCell>
												<span className="users__tableCellContent">{item.email}</span>
											</TableCell>
											<TableCell sx={{ width: 200 }}>
												<span className="users__tableCellContent">{item.phoneNumber}</span>
											</TableCell>
											<TableCell sx={{ width: 200 }}>
												<span className="users__tableCellContent">{dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}</span>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)
					}
				</TableContainer>
			</div>
		</div>
	)
}

export default Users;