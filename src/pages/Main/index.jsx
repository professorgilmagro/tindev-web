import React, { useEffect, useState } from 'react';
import Logo from '../../components/Logo';
import UserCard from '../../components/CardView/User';
import MatchCard from '../../components/CardView/Match';
import MessageNoItems from '../../components/MessageNoItems';
import Loading from '../../components/Loading';
import api from '../../services/api';
import socket from '../../services/socket';
import './style.css';

export default function Main({ match, location }) {
	const { logged } = location.state;
	const [users, setUsers] = useState([]);
	const [matchDev, setMatchDev] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadUsers() {
			const response = await api.get('/devs', {
				headers: { user: match.params.id }
			});

			setUsers(response.data);
			console.table(response.data[0]);
			setLoading(false);
		}
		loadUsers();
	}, [match.params.id]);

	// implementa o recurso de realtime para notificação de match
	useEffect(() => {
		const io = socket({ user: match.params.id });
		io.on('match', dev => {
			console.table(dev);
			setMatchDev(dev);
		});
	}, [match.params.id]);

	async function __handleAction(id, action) {
		await api.post(`/devs/${id}/${action}`, null, {
			headers: { user: match.params.id }
		});

		setUsers(users.filter(user => user._id !== id));
	}

	async function handleLike(id) {
		await __handleAction(id, 'like');
	}

	async function handleUnlike(id) {
		await __handleAction(id, 'unlike');
	}

	function handleClose() {
		setMatchDev(null);
	}

	return (
		<div className='main-container'>
			<Logo linkTo='/' />
			<h4 className='logged-user'>{logged.name}</h4>
			<Loading loading={loading} />
			<ul>
				{users.map(user => (
					<li key={user._id}>
						<UserCard
							id={user._id}
							name={user.name}
							username={user.user}
							location={user.location}
							description={user.bio}
							avatar={user.avatar}
							likeCallback={handleLike}
							unlikeCallback={handleUnlike}
						/>
					</li>
				))}
			</ul>

			<MessageNoItems
				items={users.length}
				message='Nenhum dev novo no momento!'
			/>

			{matchDev && (
				<MatchCard
					description={matchDev.bio}
					id={matchDev._id}
					name={matchDev.name}
					username={matchDev.user}
					avatar={matchDev.avatar}
					location={matchDev.location}
					closeCallback={handleClose}
				/>
			)}
		</div>
	);
}
