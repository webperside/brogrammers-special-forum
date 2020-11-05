import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
// import AuthService from '../../services/AuthService';
import { login, logout } from '../../redux/action/authActions';
import { connect } from 'react-redux';

const Navi = (props) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	// const logoutProcess = () => {
	// 	props.logout()
	// }

	const renderIfAuthenticated = () => {
		return (
			<Nav className="ml-auto" navbar>
				<Link to={'/profile'} className="btn btn-outline-success mr-2">
					Profile
				</Link>
				<Button onClick={() => props.logout()} className="btn btn-success mr-2">
					Logout
				</Button>
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
		<div>
			<Navbar color="light" light expand="md">
				<NavLink
					tag={RRNavLink}
					style={{ textDecoration: 'none', fontFamily: 'cursive', fontSize: '1.5em' }}
					to={'/'}
				>
					Brogrammers Special Forum
				</NavLink>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					{props.isAuthenticated ? renderIfAuthenticated() : renderIfNotAuthenticated()}
				</Collapse>
			</Navbar>
		</div>
	);
};

function mapStateToProps(state) {
	// console.log(state.authReducer,"mapStateToProps");
	return {
		isAuthenticated: state.authReducer
	};
}

const mapDispatchToProps = {
	login,
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
