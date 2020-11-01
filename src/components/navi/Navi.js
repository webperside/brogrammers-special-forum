import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
// import AuthService from '../../services/AuthService';
import { login, logout } from '../../redux/action/authActions';
import { connect } from 'react-redux';

const Navi = (props) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	// function loginNavi() {
		// login('webperside', 'w3bp3rs1d3', true);

		// AuthService.login('webperside', 'w3bp3rs1d3', true)
		// 	.then((response) => AuthService.saveToLocalStorage(response))
		// 	.then(login(true));
	// }

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
					<Nav className="ml-auto" navbar>
						{props.isAuthenticated ? (
							<Button onClick={() => props.logout()}>Log out</Button>
						) : (
							<Button onClick={() => props.login('webperside', 'w3bp3rs1d3', true)}>Log in</Button>
						)}
					</Nav>
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

export default connect(mapStateToProps,mapDispatchToProps)(Navi);
