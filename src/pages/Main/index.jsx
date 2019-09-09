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
	return (
		<div className='main-container'>
			<Logo />
			<ul>
				{users.map(user => (
					<li key={user._id}>
						<UserCard
							name={user.name}
							description={user.bio}
							avatar={user.avatar}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
