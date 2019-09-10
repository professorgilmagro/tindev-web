import React from 'react';

import like from '../../assets/like.svg';
import unlike from '../../assets/dislike.svg';
import Button from '../Button';
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
				<Button
					alt='Like'
					img={like}
					onClick={() => props.likeCallback(props.id)}
				/>
				<Button
					alt='Unlike'
					img={unlike}
					onClick={() => props.unlikeCallback(props.id)}
				/>
			</div>
		</div>
	);
}
