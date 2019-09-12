import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

export default function Logo(props) {
	let link = props.linkTo;
	if (props.link === undefined) {
		link = '/';
	}

	return (
		<Link to={link}>
			<img src={logo} alt='Tindev' />
		</Link>
	);
}
