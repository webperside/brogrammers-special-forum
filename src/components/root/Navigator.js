import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Navigator extends Component {
	render() {
		return (
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to='/'>Home</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<Link to='/'>Library</Link>
				</BreadcrumbItem>
				<BreadcrumbItem active>Data</BreadcrumbItem>
			</Breadcrumb>
		);
	}
}

export default Navigator;
