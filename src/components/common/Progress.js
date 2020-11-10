import React, { Component } from 'react';

class Progress extends Component {
	render() {
		return (
			<div className="d-flex justify-content-center mt-5">
				<div className="spinner-border" style={{width: '3rem', height: '3rem', color:'purple'}} role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
}

export default Progress;
