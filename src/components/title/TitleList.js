import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import '../../css/App.css';
import Progress from '../common/Progress';
import UserAvatar from '../navi/UserAvatar';
import * as titleActions from '../../redux/action/titleActions';
import { bindActionCreators } from 'redux';
import * as commonUtil from '../../redux/action/util/commonUtil';

class TitleList extends Component {
	state = {
		p: 0
	};

	// page deyishende getTitles istifade olunacaq, cid reducerden gelir

	componentDidMount() {
		this.props.actions.getTitles(0, this.props.cid);
	}

	render() {
		return this.props.titleLoadProgress ? (
			<Progress />
		) : (
			<div className="pl-2 pr-2" style={{ fontSize: '20px' }}>
				<Table hover borderless style={{ color: '#1a1148' }}>
					<thead>
						<tr>
							<th style={{ width: '5%', textAlign: 'center' }}>Trend</th>
							<th style={{ width: '80%', textAlign: 'center' }}>Başlıq | Kateqoriya</th>
							<th style={{ textAlign: 'center' }}>Rəy sayı</th>
							<th style={{ textAlign: 'center' }}>Baxış sayı</th>
						</tr>
					</thead>
					<tbody>
						{this.props.titles.map((title) => {
							return (
								<tr key={title.id}>
									<th style={{ textAlign: 'center' }} scope="row">
										{title.isTrend}
									</th>
									<td>
										<span>
											{title.name} | {title.categories}
										</span>
										<div
											className="float-right p-1"
											style={{ display: 'inline-block', fontSize: '16px' }}
										>
											<div style={{ display: 'inline-block' }}>
												<span className="pr-1">{commonUtil.getDate(title.createdAt)}</span>

												<span className="pr-1">{title.user.fullName}</span>
												<UserAvatar fontSize="10px" size="28px" userInfo={title.user} />
											</div>
										</div>
									</td>
									<td style={{ textAlign: 'center' }}>{title.repliesNumber}</td>
									<td style={{ textAlign: 'center' }}>{title.seenCount}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		titles: state.titleReducer,
		titleLoadProgress: state.titleLoadProgressReducer,
		cid: state.selectCategoryReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			getTitles: bindActionCreators(titleActions.getTitles, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleList);
