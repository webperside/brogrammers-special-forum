import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import UserAvatar from './UserAvatar';
import '../../css/App.css';

const ProfileDropdown = (props) => {
	const [ dropdownOpen, setOpen ] = useState(false);

	const toggle = () => setOpen(!dropdownOpen);

	return (
		<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle caret className="bg-transparent shadow-none" style={{ borderColor: 'transparent' }}>
				<UserAvatar />
				<div className="pl-2" style={{ display: 'inline', height: '40px', lineHeight: '40px', color: 'black' }}>
					Hamid Sultanzadeh
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
};

export default ProfileDropdown;
