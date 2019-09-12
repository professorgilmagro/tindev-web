import React from 'react';

import like from '../../../assets/images/like.svg';
import unlike from '../../../assets/images/dislike.svg';
import Button from '../../Button';
import UserIcon from '@material-ui/icons/InsertLink';
import LocalIcon from '@material-ui/icons/PlaceOutlined';
import './style.css';

export default function UserCard(props) {
	const showButtons = props.showButtons === undefined || props.showButtons;
	return (
		<div className='card-user'>
			<img src={props.avatar} alt={props.name} />
			<footer>
				<strong>{props.name}</strong>
				<a
					target='_blank'
					rel='noopener noreferrer'
					className='github-user'
					href={`https://github.com/${props.username}`}
				>
					<UserIcon fontSize='small' /> <i>{props.username}</i>
				</a>

				<span className={props.location ? 'location' : 'hide'}>
					<LocalIcon fontSize='small' />
					{props.location}
				</span>
				<p>{props.description}</p>
			</footer>
			{showButtons && (
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
			)}
		</div>
	);
}
