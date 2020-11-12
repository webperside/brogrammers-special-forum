import React, { Component } from 'react';
import CategorySelect from './CategorySelect';
import { Button, ButtonGroup } from 'reactstrap';
import '../../css/App.css';

class Toolbar extends Component {
	render() {
		return (
			<div className="pl-2">
				<CategorySelect />
				<ButtonGroup className="ml-2" size="lg">
					<Button className="bg-transparent">TREND</Button>
					<Button className="bg-transparent ml-1">YENİLİKLƏR</Button>
				</ButtonGroup>
			</div>
		);
	}
}

export default Toolbar;
