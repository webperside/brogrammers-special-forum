import React, { Component } from 'react';
import { Table } from 'reactstrap';
import '../../css/App.css';

class TitleTable extends Component {
	render() {
		return (
			<div className="pl-5 pr-5" style={{fontSize:'18px'}}>
				<Table borderless hover responsive striped >
					<thead >
						<tr>
							<th>TREND</th>
							<th style={{width:'70%'}}>Başlıq | Kateqoriya</th>
							<th>Rəy sayı</th>
							<th>Baxış sayı</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Larry</td>
							<td>the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

export default TitleTable;
