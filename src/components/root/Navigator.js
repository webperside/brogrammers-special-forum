import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../../css/App.css';

class Navigator extends Component {
	render() {
		return (
			// <div
			// 	// className="pr-5 pl-5"
			// 	style={{
			// 		backgroundColor: '#221178!important'
			// 	}}
			// >
				<Breadcrumb
					className="shadow-lg mb-2 rounded"
					style={{
						backgroundColor: '#221178!important',
						fontWeight: 'bold'
					}}
				>
					<BreadcrumbItem className="ml-5">
						<Link to="/">Home</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link to="/">Library</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>Data</BreadcrumbItem>
				</Breadcrumb>
			// </div>
		);
	}
}

export default Navigator;
