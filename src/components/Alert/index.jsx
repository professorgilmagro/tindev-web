import React, { useState } from 'react';
import './style.css';

export default function Alert(props) {
	const type = props.type ? props.type : 'info';
	const [show, setShow] = useState(true);

	function handleClose(e) {
		setShow(false);
	}

	if (!show) {
		return '';
	}

	return (
		<div className={'alert ' + type}>
			<span className='closebtn' onClick={e => handleClose(e)}>
				×
			</span>
			<strong>{props.title}</strong> {props.text}
		</div>
	);
}
