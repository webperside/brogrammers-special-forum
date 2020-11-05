import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

const TextInput = ({ name, label, onChange, placeHolder, value, error = '' }) => {
	let wrapperClass = 'form-group';

	return (
		<FormGroup className={wrapperClass}>
			<Label htmlFor={name}>{label}</Label>
			<Input
				type="text"
				name={name || ''}
				className={error.length > 0 ? 'form-control is-invalid' : 'form-control'}
				placeholder={placeHolder || ''}
				value={value || ''}
				onChange={onChange}
			/>
			{error.length > 0 ? <FormFeedback>{error}</FormFeedback> : null}
		</FormGroup>
	);
};

export default TextInput;
