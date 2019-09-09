import React from 'react';

import like from '../../assets/like.svg';
import unlike from '../../assets/dislike.svg';
import './style.css';

export default function UserCard(props) {
	return (
		<div className='card-user'>
			<img src={props.avatar} alt={props.name} />
			<footer>
				<strong>{props.name}</strong>
				<p>{props.description}</p>
			</footer>
			<div className='buttons'>
				<button type='button'>
					<img src={like} alt='Like' />
				</button>
				<button type='button'>
					<img src={unlike} alt='Unlike' />
				</button>
			</div>
		</div>
	);
}
