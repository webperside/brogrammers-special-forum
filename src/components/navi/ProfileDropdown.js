import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import UserAvatar from './UserAvatar';
import '../../css/App.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCog, faPowerOff, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import * as authActions from '../../redux/action/authActions';
import * as userActions from '../../redux/action/userActions';
import AuthenticationService from '../../services/AuthenticationService';
import { AUTH } from '../../constants';
import * as storageUtil from '../../redux/action/util/storageUtil';

class ProfileDropdown extends Component {
	state = {
		dropdownOpen: false
	};

	setOpen = (value) => {
		this.setState({
			dropdownOpen: value
		});
	};

	toggle = () => {
		this.setOpen(!this.state.dropdownOpen);
	};

	logoutProcess = () => {
		AuthenticationService.logout().then(() => {
			this.props.actions.setAuthentication(false);
			this.props.actions.setUserInfo({});
			this.props.history.push('/');
			storageUtil.removeItems([ AUTH.USER_ACCESS_TOKEN, AUTH.USER_REFRESH_TOKEN ]);
		});
	};

	render() {
		return (
			<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle caret className="bg-transparent shadow-none" style={{ borderColor: 'transparent' }}>
					<UserAvatar />
					<div
						className="pl-2"
						style={{ display: 'inline', height: '40px', lineHeight: '40px', color: 'white' }}
					>
						{this.props.userInfo.fullName}
					</div>
					<FontAwesomeIcon className="ml-1" size="1x" icon={faAngleDown} />
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem header>@{this.props.userInfo.username}</DropdownItem>
					<DropdownItem>
						<FontAwesomeIcon className="mr-1" size="lg" icon={faUserCircle} color="purple"/>
						<Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">
							Profil
						</Link>
					</DropdownItem>
					<DropdownItem disabled>
						<FontAwesomeIcon className="mr-1" size="lg" icon={faCog} color="purple"/>
						Tənzimləmələr
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem onClick={() => this.logoutProcess()}>
						<FontAwesomeIcon className="mr-1" size="lg" icon={faPowerOff} color="purple"/>
						Çıxış
					</DropdownItem>
				</DropdownMenu>
			</ButtonDropdown>
		);
	}
}

function mapStateToProps(state) {
	return {
		userInfo: state.userShortInfoReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			setAuthentication: bindActionCreators(authActions.setAuthentication, dispatch),
			setUserInfo: bindActionCreators(userActions.getUserShortInfoSuccess, dispatch)
		}
	};
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ProfileDropdown);
