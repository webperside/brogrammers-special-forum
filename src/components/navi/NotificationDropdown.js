import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBell } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';
import "../../css/App.css";

const NotificationDropdown = (props) => {
	const [ dropdownOpen, setOpen ] = useState(false);

	const toggle = () => setOpen(!dropdownOpen);

	return (
		<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle caret className="bg-transparent shadow-none" style={{ borderColor: 'transparent' }}>
				{/* <FontAwesomeIcon icon={["far","fa-bell"]}></FontAwesomeIcon> */}
                <FontAwesomeIcon size="lg" icon={faBell} />
                <Badge className='ml-1' color='success'>4</Badge>
				<FontAwesomeIcon className='ml-1' size='1x' icon={faAngleDown}/>
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

export default NotificationDropdown;