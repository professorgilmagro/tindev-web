import React from 'react';

export default function Button(props) {
	return (
		<button type='button' onClick={props.onClick}>
			<img src={props.img} alt={props.alt} title={props.tile} />
		</button>
	);
}
