import React, { useEffect, useState, Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import UserAvatar from './UserAvatar';
import '../../css/App.css';

class ProfileDropdown extends Component {
	state = {
		dropdownOpen: false,
		userInfo: {
			fullName:'',
			username:'',
			avatar:''
		}
	};

	setOpen = (value) => {
		this.setState({
			...this.state,
			dropdownOpen: value
		});
	};

	toggle = () => {
		this.setOpen(!this.state.dropdownOpen);
	};

	setInfoFromSS = () => {
		let ui = JSON.parse(localStorage.getItem('user-detail'));
		this.setState({
			...this.state,
			userInfo: ui
		});
	};

	componentDidMount() {
		this.setInfoFromSS();
	}

	render() {
		return (
			<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle caret className="bg-transparent shadow-none" style={{ borderColor: 'transparent' }}>
					<UserAvatar userInfo={this.state.userInfo}/>
					<div
						className="pl-2"
						style={{ display: 'inline', height: '40px', lineHeight: '40px', color: 'white' }}
					>
						{this.state.userInfo.fullName}
					</div>
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem header>Header</DropdownItem>
					<DropdownItem disabled>Action</DropdownItem>
					<DropdownItem>Another Action</DropdownItem>
					<DropdownItem divider />
					<DropdownItem>Another Action</DropdownItem>
				</DropdownMenu>
			</ButtonDropdown>
		);
	}
}

export default ProfileDropdown;
