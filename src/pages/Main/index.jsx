import React, { useEffect, useState } from 'react';
import Logo from '../../components/Logo';
import UserCard from '../../components/Dev/UserCard';
import api from '../../services/api';
import './style.css';

export default function Main({ match }) {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		async function loadUsers() {
			const response = await api.get('/devs', {
				headers: { user: match.params.id }
			});

			setUsers(response.data);
		}
		loadUsers();
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

	return (
		<div className='main-container'>
			<Logo />
			<ul>
				{users.map(user => (
					<li key={user._id}>
						<UserCard
							id={user._id}
							name={user.name}
							description={user.bio}
							avatar={user.avatar}
							likeCallback={handleLike}
							unlikeCallback={handleUnlike}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
