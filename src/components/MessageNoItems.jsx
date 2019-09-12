import React from 'react';

export default function MessageNoItems(props) {
	const message = props.message ? props.message : 'No content! :(';
	const style = props.style ? props.style : 'empty-message';

	if (props.items > 0) {
		return '';
	}

	return (
		<div className={style}>
			<div className='message'>{message}</div>
		</div>
	);
}
