import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';

type Props = {}

const Sidebar = (props: Props) => {
	return (
		<nav className="nav__sidebar" id="nav__sidebar">
			<div className="nav__item">
				<img className="nav__item__icon" src="/icons/briefcase.png" alt="" />
				<span className="nav__item__text">Switch Organization</span>
				<span className="nav__item__symbol">&#8964;</span>
			</div>
			<div className="nav__spacing" />
			<Link to="/">
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/home.png" alt="" />
					<span className="nav__item__text">Dashboard</span>
				</div>
			</Link>
			<div className="nav__spacing" />
			<div className="nav__customers__group">
				<p className="link__group__text">Customers</p>
				<Link to="/users">
					<div className="nav__item">
						<img className="nav__item__icon" src="/icons/users.png" alt="" />
						<span className="nav__item__text">Users</span>
					</div>
				</Link>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/guarantors.png" alt="" />
					<span className="nav__item__text">Guarantors</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/loans.png" alt="" />
					<span className="nav__item__text">Loans</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/decision_models.png" alt="" />
					<span className="nav__item__text">Decision Models</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/savings.png" alt="" />
					<span className="nav__item__text">Savings</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/loan_requests.png" alt="" />
					<span className="nav__item__text">Loan Requests</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/whitelist.png" alt="" />
					<span className="nav__item__text">Whitelist</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/karma.png" alt="" />
					<span className="nav__item__text">Karma</span>
				</div>
			</div>
			<div className="nav__spacing" />
			<div className="nav__businesses__group">
				<p className="link__group__text">Businesses</p>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/briefcase.png" alt="" />
					<span className="nav__item__text">Organization</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/loan_products.png" alt="" />
					<span className="nav__item__text">Loan Products</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/savings_products.png" alt="" />
					<span className="nav__item__text">Savings Products</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/fees_and_charges.png" alt="" />
					<span className="nav__item__text">Fees and Charges</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/transactions.png" alt="" />
					<span className="nav__item__text">Transactions</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/services.png" alt="" />
					<span className="nav__item__text">Services</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/service_account.png" alt="" />
					<span className="nav__item__text">Service Account</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/settlements.png" alt="" />
					<span className="nav__item__text">Settlements</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/reports.png" alt="" />
					<span className="nav__item__text">Reports</span>
				</div>
			</div>
			<div className="nav__spacing" />
			<div className="nav__settings__group">
				<p className="link__group__text">Settings</p>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/preferences.png" alt="" />
					<span className="nav__item__text">Preferences</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/fees_and_pricing.png" alt="" />
					<span className="nav__item__text">Fees and Pricing</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/audit_logs.png" alt="" />
					<span className="nav__item__text">Audit Logs</span>
				</div>
				<div className="nav__item">
					<img className="nav__item__icon" src="/icons/systems_messages.png" alt="" />
					<span className="nav__item__text">Systems Messages</span>
				</div>
			</div>
			<div className="nav__spacing" />
			<div className="nav__spacing" />
			<div className="nav__spacing" />
			<div className="nav__divider" />
			<div className="nav__spacing" />
			<Link to="/auth/login">
				<div className="nav__item_bright">
					<img className="nav__item__icon" src="/icons/logout.png" alt="" />
					<span className="nav__item__text">Logout</span>
				</div>
			</Link>
			<div className="nav__spacing" />
			<p className="nav__versionText">v1.2.0</p>
			<div className="nav__spacing" />
		</nav>
	)
}

export default Sidebar;