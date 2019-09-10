import React, { useState } from 'react';
import Logo from '../../components/Logo';
import api from '../../services/api';
import './style.css';

export default function Login({ history }) {
	const [username, setUsername] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const response = await api.post('/devs', { username });
		const { _id } = response.data;
		history.push(`/dev/${_id}`);
	}

	return (
		<div className='login-container'>
			<form onSubmit={handleSubmit}>
				<Logo />
				<input
					value={username}
					onChange={e => setUsername(e.target.value)}
					placeholder='Digite seu usuário do github'
				/>
				<button type='submit'>Entrar</button>
			</form>
		</div>
	);
}
