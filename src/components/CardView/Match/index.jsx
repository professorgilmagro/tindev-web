import React from 'react';
import './style.css';
import ItMatch from '../../../assets/images/itsamatch.png';
import UserCard from '../User';

export default function Match(props) {
	return (
		<div className='match-container'>
			<img src={ItMatch} alt='Its a Match' />
			<UserCard
				name={props.name}
				username={props.username}
				description={props.description}
				id={props.id}
				avatar={props.avatar}
				location={props.location}
				showButtons={false}
			/>
			<button onClick={() => props.closeCallback()} type='button'>
				FECHAR
			</button>
		</div>
	);
}
