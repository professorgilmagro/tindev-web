import React, { useState, Fragment } from 'react';

import like from '../../../assets/images/like.svg';
import unlike from '../../../assets/images/dislike.svg';
import Button from '../../Button';
import UserIcon from '@material-ui/icons/InsertLink';
import LocalIcon from '@material-ui/icons/PlaceOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import ThumbUp from '@material-ui/icons/ThumbUpAltRounded';
import ThumbDown from '@material-ui/icons/ThumbDownAltRounded';
import MessageNoItems from '../../../components/MessageNoItems';
import './style.css';

export default function UserCard(props) {
	const showMenuInfo = props.showMenuInfo === undefined || props.showMenuInfo;
	const showButtonLike =
		props.showButtonLike === undefined || props.showButtonLike;
	const showButtonUnlike =
		props.showButtonUnlike === undefined || props.showButtonUnlike;
	const showButtons = showButtonLike || showButtonUnlike;
	const showIconUp =
		props.showIconUp === undefined ? false : props.showIconUp;
	const showIconDown =
		props.showIconDown === undefined ? false : props.showIconDown;
	const [showMenu, setShowMenu] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [itemsCount, setItemsCount] = useState(1);
	const { languages, jobs } = props.extraInfo;

	return (
		<div className='card-user'>
			<header>
				<img src={props.avatar} alt={props.name} className='avatar' />
				{showIconUp && (
					<span className='icon-up-container'>
						<ThumbUp />
					</span>
				)}
				{showIconDown && (
					<span className='icon-down-container'>
						<ThumbDown />
					</span>
				)}
				{showMenuInfo && (
					<span className='more-information'>
						<MoreIcon onClick={() => setShowMenu(true)} />
					</span>
				)}
				{showMenu && (
					<Fragment>
						<div className='menu'>
							<h4>Mais informações</h4>
							<ul>
								<li
									onClick={() => {
										setSelectedItem('language');
										setItemsCount(
											languages && languages.length
										);
									}}
								>
									Tecnologias
								</li>
								<li
									onClick={() => {
										setSelectedItem('jobs');
										setItemsCount(jobs && jobs.length);
									}}
								>
									Jobs
								</li>
							</ul>
							<button onClick={e => setShowMenu(false)}>
								Fechar
							</button>
						</div>
						{selectedItem && (
							<div className='additional-info-content'>
								<h4>
									{selectedItem === 'jobs'
										? 'Jobs'
										: 'Tecnologias'}
								</h4>
								<div className='info-conteiner'>
									<ul className={selectedItem}>
										{selectedItem === 'language' &&
											languages &&
											languages.map(item => (
												<li key={item}>{item}</li>
											))}
										{selectedItem === 'jobs' &&
											jobs &&
											jobs.map(job => (
												<li key={job.name}>
													<a
														href={job.url}
														target='_blank'
														rel='noopener noreferrer'
													>
														{job.name}
													</a>
												</li>
											))}
									</ul>
									<MessageNoItems
										items={itemsCount}
										message='Não há itens disponíveis para esta seção.'
									/>
								</div>
								<button
									onClick={e => {
										setSelectedItem(null);
										setShowMenu(false);
									}}
								>
									Fechar
								</button>
							</div>
						)}
					</Fragment>
				)}
			</header>
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
				<p>
					{props.description || (languages && languages.join(', '))}
				</p>
			</footer>
			{showButtons && (
				<div className='buttons'>
					{showButtonLike && (
						<Button
							alt='Like'
							img={like}
							onClick={() => props.likeCallback(props.id)}
						/>
					)}
					{showButtonUnlike && (
						<Button
							alt='Unlike'
							img={unlike}
							onClick={() => props.unlikeCallback(props.id)}
						/>
					)}
				</div>
			)}
		</div>
	);
}
