import React, { useState } from 'react';
import Logo from '../../components/Logo';
import api from '../../services/api';
import Loading from '../../components/Loading';
import './style.css';

export default function Login({ history }) {
	const [username, setUsername] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		setLoading(true);
		const response = await api.post('/devs', { username });
		const { _id } = response.data;

		setLoading(false);
		history.push(`/dev/${_id}`, { logged: response.data });
	}

	return (
		<div className='login-container'>
			<form onSubmit={handleSubmit}>
				<Logo />
				<Loading loading={loading} />
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
