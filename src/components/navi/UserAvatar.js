import React, { Component } from 'react';

class UserAvatar extends Component {
	render() {
		return (
			<div style={{display: 'inline-block',color: 'white'}}>
				<div style={{
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
                    backgroundColor: 'rgb(231, 76, 60)'
                }}>
					HS
				</div>
			</div>
		);
	}
}

export default UserAvatar;
