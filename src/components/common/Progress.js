import React, { Component } from 'react';

class Progress extends Component {
	render() {
		return (
			<div className={'d-flex justify-content-center ' + (this.props.mt ? 'mt-5' : '')}>
				<div
					className="spinner-border"
					style={{
						width: (this.props.size ? this.props.size : '3') + 'rem',
						height: (this.props.size ? this.props.size : '3') + 'rem',
						color: 'purple'
					}}
					role="status"
				>
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
}

export default Progress;
