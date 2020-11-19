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
			<div style={{ display: 'inline-block', color: 'white'}}>
				<div
					style={{
						boxSizing: 'border-box',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						lineHeight: this.props.size ? this.props.size : '40px',
						textAlign: 'center',
						fontWeight:"bold",
						borderRadius: '100%',
						maxWidth: this.props.size ? this.props.size : '40px',
						width: this.props.size ? this.props.size : '40px',
						maxHeight: this.props.size ? this.props.size : '40px',
						height: this.props.size ? this.props.size : '40px',
						backgroundColor: this.props.userInfo.avatar,
						fontSize: this.props.fontSize ? this.props.fontSize : '16px'
						// 'rgb(231, 76, 60)'
					}}
				>
					{this.getInitials()}
				</div>
			</div>
		);
	}
}

// function mapStateToProps(state){
// 	return {
// 		userInfo : state.userShortInfoReducer
// 	}
// }

export default UserAvatar;
