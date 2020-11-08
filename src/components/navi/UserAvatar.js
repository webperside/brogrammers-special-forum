import React, { Component } from 'react';

class UserAvatar extends Component {
	getInitials = () => {
		let fullNameArray = this.props.userInfo.fullName.split(' ');
		let initials = '';
		for (let i = 0; i < fullNameArray.length; i++) {
			initials += fullNameArray[i][0];
		}
		return initials;
	};

	render() {
		return (
			<div style={{ display: 'inline-block', color: 'white' }}>
				<div
					style={{
						boxSizing: 'border-box',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						lineHeight: '40px',
						textAlign: 'center',
						borderRadius: '100%',
						maxWidth: '40px',
						width: '40px',
						maxHeight: '40px',
						height: '40px',
						backgroundColor: this.props.userInfo.avatar
						// 'rgb(231, 76, 60)'
					}}
				>
					{this.getInitials()}
				</div>
			</div>
		);
	}
}

export default UserAvatar;
