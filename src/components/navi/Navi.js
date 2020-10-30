import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/action/authActions';

const Navi = (props) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

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
							<Button onClick={props.logout}>Log out</Button>
						) : (
							<Button onClick={props.login}>Log in</Button>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		isAuthenticated: state.authReducer
	};
}

const mapDispatchToProps = {
	login,
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
