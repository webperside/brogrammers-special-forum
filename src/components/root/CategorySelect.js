import React, { Component } from 'react';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Progress from '../common/Progress';
import CategoryService from '../../services/CategoryService';
import { connect } from 'react-redux';
import * as categoryActions from '../../redux/action/categoryActions';
import * as titleActions from '../../redux/action/titleActions';
import { bindActionCreators } from 'redux';

class CategorySelect extends Component {
	state = {
		btnDropright: false,
		progress: true,
		categories: [],
		filterCategories: []
	};

	handleSuccessResponse = (response) => {
		response = response.data;
		this.setState({
			categories: response,
			filterCategories: response,
			progress: false
		});
	};

	handleFailedResponse = (er) => {
		er = er.response.data;
		console.log(er);
	};

	getCategories = () => {
		if (this.state.categories.length === 0) {
			CategoryService.getAll().then(this.handleSuccessResponse).catch(this.handleFailedResponse);
		} else {
			this.setState({
				filterCategories : this.state.categories
			})
		}
	};

	filterCategories = (name) => {
		if (name) {
			return this.state.categories.filter(
				(category) =>
					category.name.toLowerCase().includes(name.toLowerCase()) ||
					category.urlName.includes(name.toLowerCase())
			);
		}
		return this.state.categories;
	};

	onChangeHandler = (event) => {
		const value = event.target.value;
		this.setState({
			filterCategories: this.filterCategories(value)
		});
	};

	onClickSelectCategory = (cid) => {
		if (cid !== this.props.cid) {
			this.props.actions.selectCategory(cid);
			this.props.actions.getTitles(0, cid);// category ilk sechildiyi haldi, ona gore page = 0
		}
	};

	render() {
		return (
			<Dropdown
				direction="right"
				isOpen={this.state.btnDropright}
				toggle={() => {
					this.setState({ btnDropright: !this.state.btnDropright });
				}}
				style={{ display: 'inline-block' }}
			>
				<DropdownToggle
					caret
					className="bg-transparent shadow-none border-bottom"
					style={{ color: 'white', borderColor: 'transparent', fontSize: '1rem' }}
					onClick={() => this.getCategories()}
				>
					Bütün kateqoriyalar<FontAwesomeIcon className="ml-1" size="1x" icon={faAngleRight} />
				</DropdownToggle>
				<DropdownMenu>
					<div className="d-flex bd-highlight">
						<div className="p-2 mb-2 flex-fill bd-highlight">
							<input
								onChange={this.onChangeHandler}
								className="form-control form-control-sm"
								type="text"
								placeholder="Axtar"
								aria-label="Search"
							/>
						</div>
					</div>
					<DropdownItem divider />
					{this.state.progress ? (
						<Progress size="2" mt={false} />
					) : (
						this.state.filterCategories.map((category) => {
							return (
								<DropdownItem
									key={category.id}
									className="p-1"
									onClick={() => this.onClickSelectCategory(category.id)}
								>
									<div className="d-flex bd-highlight">
										<div className="pl-2 pr-2 flex-grow-1 bd-highlight">
											<span
												className="d-inline-block text-truncate"
												style={{ maxWidth: '150px', fontSize: '16px' }}
											>
												{category.name}
											</span>
										</div>
										<div className="pl-2 pr-2 bd-highlight">
											<h5>
												<Badge color="info" pill>
													{category.titlesNumber}
												</Badge>
											</h5>
										</div>
									</div>
								</DropdownItem>
							);
						})
					)}
				</DropdownMenu>
			</Dropdown>
		);
	}
}

function mapStateToProps(state) {
	return {
		cid: state.selectCategoryReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			selectCategory: bindActionCreators(categoryActions.selectCategory, dispatch),
			getTitles: bindActionCreators(titleActions.getTitles, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);
