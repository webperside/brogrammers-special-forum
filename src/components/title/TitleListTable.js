import React, { Component } from 'react';
import { Table } from 'reactstrap';
import '../../css/App.css';
import TitleService from '../../services/TitleService';
import Progress from '../common/Progress';
import UserAvatar from '../navi/UserAvatar';

class TitleTable extends Component {
	state = {
		titles: [],
		progress: true
	};

	handleSuccessResponse = (response) => {
		response = response.data;
		this.setState({
			titles: response.content,
			progress: false
		});
	};

	handleFailedResponse = (er) => {
		er = er.response.data;
		console.log(er);
		this.setState({
			progress: false
		});
	};

	getTitles = (p, cid) => {
		TitleService.getTitles(p, cid).then(this.handleSuccessResponse).catch(this.handleFailedResponse);
	};

	componentDidMount() {
		this.getTitles();
	}

	render() {
		return this.state.progress ? (
			<Progress />
		) : (
			<div className="pl-2 pr-2" style={{ fontSize: '18px' }}>
				<Table borderless hover responsive striped style={{color:'#1a1148'}}>
					<thead>
						<tr>
							<th>TREND</th>
							<th style={{ width: '70%' }}>Başlıq | Kateqoriya</th>
							<th>Rəy sayı</th>
							<th>Baxış sayı</th>
						</tr>
					</thead>
					<tbody>
						{this.state.titles.map((title) => {
							return (
								<tr key={title.id}>
									<th scope="row">{title.isTrend}</th>
									<td>
										{title.name} | {title.categories}
										<div className="float-right">
											{title.user.fullName}
											<UserAvatar userInfo={title.user} />
										</div>
									</td>
									<td>{title.repliesNumber}</td>
									<td>{title.seenCount}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default TitleTable;
