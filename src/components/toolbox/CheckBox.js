import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const Checkbox = ({ name, onChange, defaultChecked }) => {
	return (
		<FormGroup check>
			<Label check>
				<Input name={name} onChange={onChange} defaultChecked={defaultChecked} type="checkbox" /> Remember me
			</Label>
		</FormGroup>
	);
};

export default Checkbox;
