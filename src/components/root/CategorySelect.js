import React, { Component } from 'react';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Progress from '../common/Progress';
import CategoryService from '../../services/CategoryService';

class CategorySelect extends Component {
	state = {
		btnDropright: false,
		progress: true,
		categories: []
	};

	handleSuccessResponse = (response) => {
		response = response.data;
		console.log(response.content);
		this.setState({
			categories: response.content,
			progress: false
		});
	};

	handleFailedResponse = (er) => {
		er = er.response.data;
		console.log(er);
	};

	componentDidMount() {
		CategoryService.getAll().then(this.handleSuccessResponse);
	}

	getCategories = (name) => {
		if (name) {
			return this.state.categories.filter(
				(category) => category.name.includes(name) || category.urlName.includes(name)
			);
		}
		return this.state.categories;
	};

	render() {
		return (
			<Dropdown
				direction="right"
				isOpen={this.state.btnDropright}
				toggle={() => {
					this.setState({ btnDropright: !this.state.btnDropright });
				}}
			>
				<DropdownToggle
					caret
					className="bg-transparent shadow-none"
					style={{ color: 'purple', borderColor: 'transparent' }}
				>
					Bütün kateqoriyalar<FontAwesomeIcon className="ml-1" size="1x" icon={faAngleRight} />
				</DropdownToggle>
				<DropdownMenu>
					<div className="d-flex bd-highlight">
						<div className="p-2 mb-2 flex-fill bd-highlight">
							<input
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
						this.getCategories().map((category) => {
							return (
								<DropdownItem key={category.id} className="p-1">
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

export default CategorySelect;
