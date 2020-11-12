import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavLink } from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
// import AuthService from '../../services/AuthService';
import { connect } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';
import NotificationDropdown from './NotificationDropdown';

const Navi = (props) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const renderIfAuthenticated = () => {
		return (
			<Nav className="ml-auto" navbar>
				<NotificationDropdown />
				<ProfileDropdown />
			</Nav>
		);
	};

	const renderIfNotAuthenticated = () => {
		return (
			<Nav className="ml-auto" navbar>
				<Link to={'/login'} className="btn btn-outline-success mr-2">
					Sign in
				</Link>
				<Link to={'/sign-up'} className="btn btn-outline-success mr-2">
					Sign up
				</Link>
			</Nav>
		);
	};

	return (
		<Navbar className="shadow-lg rounded pr-2 pl-2" style={{ backgroundColor: '#1a1148' }} dark expand="md">
			<NavLink
				tag={RRNavLink}
				style={{
					textDecoration: 'none',
					fontFamily: 'cursive',
					color: '#FFF'
				}}
				to={'/'}
				className="text-wrap"
			>
				<span style={{ fontWeight: 'bold', fontSize: '1.5em' }}>BSForum</span>
			</NavLink>
			{/* <form className="form-inline d-flex justify-content-center md-form form-sm mt-0">
				<i className="fas fa-search" aria-hidden="true" />
				<input
					className="form-control form-control-sm ml-3 w-100"
					type="text"
					placeholder="Search"
					aria-label="Search"
				/>
			</form> */}
			<NavbarToggler style={{ color: 'white' }} onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				{props.isAuthenticated ? renderIfAuthenticated() : renderIfNotAuthenticated()}
			</Collapse>
		</Navbar>
	);
};

function mapStateToProps(state) {
	return {
		isAuthenticated: state.authReducer
	};
}

export default connect(mapStateToProps)(Navi);
