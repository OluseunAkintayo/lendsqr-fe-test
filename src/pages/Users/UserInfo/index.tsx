import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './userinfo.scss';
import { Grid, Rating } from '@mui/material';

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

const userInfo = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = React.useState<boolean>(false);
	const [user, setUser] = React.useState<UserProps | null>(null);
	const [bank, setBank] = React.useState<string>("");
	const storedUser = localStorage.getItem('user') as string | null;
	const [userRatong, setUserRating] = React.useState<number | null>(Math.floor(Math.random() * 3));
	const [maritalStatus, setMaritalStatus] = React.useState<string>("Single");
	const status: string[] = ['Single', 'Married', 'Separated'];
	React.useEffect(() => {
		if(storedUser) {
			let resolvedUser: UserProps = JSON.parse(storedUser);
			setUser(resolvedUser);
			setLoading(true);
			setTimeout(() => setLoading(false), 2000);
		}
	}, [storedUser]);

	let storedBanks = localStorage.getItem('banks') as string | null;
	React.useEffect(() => {
		if(storedBanks) {
			let parsedBanks = JSON.parse(storedBanks);
			const selectedBank = parsedBanks[Math.floor(Math.random() * 40)]?.name;
			setBank(selectedBank);
			setMaritalStatus(status[Math.floor(Math.random() * 3)])
		}
	}, [storedBanks]);

	return (
		<React.Fragment>
			{
				loading ?
				<div className="userInfo__loading"><div className="loading" /></div>
				: user &&
				<div className="userInfo">
					<button onClick={() => navigate(-1)} className="userInfo__backArrow">
						<span className="arrowIcon">&#8592;</span>
						<span>Back to Users</span>
					</button>
					<div className="topbar">
						<h2 className="userInfo__pageTitle">User Details</h2>
						<div className="topbar__btnrow">
							<button className="blacklist">blacklist user</button>
							<button className="activate">{ dayjs(user.lastActiveDate) < dayjs() ? "activate" : "deactivate" } user</button>
						</div>
					</div>
					<div className="userSummary">
						<div className="userSummary__topMenu">
							<div className="name__avatar">
								<div className="user_avatar">
									<img src={user.profile.avatar} alt="profile-picture" />
								</div>
								<div className="username">
									<h3 className="username__fullName">{user.profile.firstName} {user.profile.lastName}</h3>
									<span className="userAlias">{user.accountNumber}</span>
								</div>
							</div>
							<div className="gap" />
							<div className="user__tier">
								<p>User's tier</p>
								<Rating
									name="user-rating"
									max={3}
									value={userRatong}
									onChange={(e, newVal) => setUserRating(newVal)}
								/>
							</div>
							<div className="gap" />
							<div className="user__accountInfo">
								<h4 className="balance">₦{Number(user.accountBalance).toLocaleString()}</h4>
								<h4 className="bankInfo">{user.profile.bvn}/{bank}</h4>
							</div>
						</div>
						<div className="userSummary__bottomMenu">
							<button>General Details</button>
							<button>Documents</button>
							<button>Bank Details</button>
							<button>Loans</button>
							<button>Savings</button>
							<button>App and System</button>
						</div>
					</div>
					<div className="userInfo__details">
						<h4 className="section__title">Personal Information</h4>
						<Grid container columnSpacing={6} rowSpacing={3}>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Full Name</p>
								<p className="itemValue">{user.profile.firstName + " " + user.profile.lastName}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Phone Number</p>
								<p className="itemValue">{user.phoneNumber}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Email Address</p>
								<p className="itemValue">{user.email}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Bvn</p>
								<p className="itemValue">{user.profile.bvn}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Gender</p>
								<p className="itemValue">{user.profile.gender}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Marital status</p>
								<p className="itemValue">{maritalStatus}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Children</p>
								<p className="itemValue">{maritalStatus !== "Married" ? "None" : [1, 2, 3, 4][Math.floor(Math.random() * 4)]}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Type of residence</p>
								<p className="itemValue">{maritalStatus === "Single" ? "Parent’s Apartment" : "Own Apartment"}</p>
							</Grid>
						</Grid>
						<div className="divider" />
						<h4 className="section__title">Education and Employment</h4>
						<Grid container columnSpacing={6} rowSpacing={3}>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">level of education</p>
								<p className="itemValue">{user.education.level}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">employment status</p>
								<p className="itemValue">{user.education.employmentStatus}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">sector of employment</p>
								<p className="itemValue">{user.education.sector}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Duration of employment</p>
								<p className="itemValue">{user.education.duration}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">office email</p>
								<p className="itemValue">{user.education.officeEmail}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Monthly income</p>
								<p className="itemValue">₦{Number(user.education.monthlyIncome[0]).toLocaleString()} - ₦{Number(user.education.monthlyIncome[1]).toLocaleString()}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">loan repayment</p>
								<p className="itemValue">₦{Number(user.education.loanRepayment).toLocaleString()}</p>
							</Grid>
						</Grid>
						<div className="divider" />
						<h4 className="section__title">Socials</h4>
						<Grid container columnSpacing={6} rowSpacing={3}>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Twitter</p>
								<p className="itemValue">
									<a href={`https://twitter.com/${user.socials.twitter.substring(1)}`} target="_blank">{user.socials.twitter}</a>
								</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Facebook</p>
								<p className="itemValue">
									<a href={`https://facebook.com/${user.socials.facebook.substring(1)}`} target="_blank">{user.socials.facebook}</a>
								</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Instagram</p>
								<p className="itemValue">
									<a href={`https://instagram.com/${user.socials.instagram.substring(1)}`} target="_blank">{user.socials.instagram}</a>
								</p>
							</Grid>
						</Grid>
						<div className="divider" />
						<h4 className="section__title">Guarantor</h4>
						<Grid container columnSpacing={6} rowSpacing={3}>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">full Name</p>
								<p className="itemValue">{user.guarantor.firstName + " " + user.guarantor.lastName}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Phone Number</p>
								<p className="itemValue">{user.guarantor.phoneNumber}</p>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Email Address</p>
								<p className="itemValue">{user.guarantor.firstName.toLowerCase() + "@mail.com"}</p>
								{/* <p className="itemValue">{user.guarantor?.email}</p> */}
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={12/5}>
								<p className="itemTitle">Relationship</p>
								<p className="itemValue">{user.guarantor.gender === "Male" ? "Uncle" : "Sister"}</p>
							</Grid>
						</Grid>
					</div>
				</div>
			}
		</React.Fragment>
	)
}

export default userInfo;