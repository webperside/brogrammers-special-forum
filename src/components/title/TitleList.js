import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import '../../css/App.css';
import TitleService from '../../services/TitleService';
import Progress from '../common/Progress';
import UserAvatar from '../navi/UserAvatar';

class TitleList extends Component {
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
			this.state.titles.map((title) => {
				return (
					<div className="d-flex flex-column bd-highlight pl-2 pr-2" key={title.id}>
						<div className="bd-highlight">
							<div className="d-flex bd-highlight" style={{ fontSize: '20px', color: '#1a1148' }}>
								<div className="flex-grow-1 bd-highlight">
									<div>
										{title.name} | {title.categories}
									</div>
									<div className="float-left pr-1">
										<Badge style={{ fontSize: '14px' }} color="success" pill>
											Rəy sayı - {title.repliesNumber}
										</Badge>
									</div>

									<div className="float-left pr-1">
										<Badge style={{ fontSize: '14px' }} color="info" pill>
											Baxış sayı - {title.seenCount}
										</Badge>
									</div>
									{title.isTrend ? (
										<div className="float-left">
											<Badge style={{ fontSize: '14px' }} color="danger" pill>
												Trend
											</Badge>
										</div>
									) : null}
									<div>
										<div className="float-right p-1">
											<span className="pr-1">{title.user.fullName}</span>
											<UserAvatar userInfo={title.user} />
										</div>
									</div>
									{/* className="p-2 bd-highlight" */}
								</div>
							</div>
						</div>
						<div className="bd-highlight">
						<hr />

						</div>
					</div>
				);
			})
		);
	}
}

export default TitleList;

{
	/* <div className="pl-2 pr-2" style={{ fontSize: '18px' }}>
				<Table hover borderless style={{ color: '#1a1148'}}>
					<thead>
						<tr>
							<th>TREND</th>
							<th>Başlıq | Kateqoriya</th>
						</tr>
					</thead>
					<tbody>
						{this.state.titles.map((title) => {
							return (
								<tr key={title.id}>
									<th scope="row">{title.isTrend}</th>
									<td>
										{title.name} | {title.categories}
										<div>
											<div className="float-left">
												<Badge style={{ fontSize: '14px' }} color="success" pill>
													{' '}
													Rəy sayı - {title.repliesNumber}
												</Badge>
											</div>

											<div className="float-left">
												<Badge style={{ fontSize: '14px' }} color="info" pill>
													{' '}
													Baxış sayı - {title.seenCount}
												</Badge>
											</div>

											<div className="float-right p-1">
												<span className="pr-1">{title.user.fullName}</span>
												<UserAvatar userInfo={title.user} />
											</div>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div> */
}
