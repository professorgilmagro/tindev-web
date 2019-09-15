import React, { useState } from 'react';
import Logo from '../../components/Logo';
import api from '../../services/api';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';
import './style.css';

export default function Login({ history }) {
	const [username, setUsername] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();

		setErrorMessage(null);
		setLoading(true);
		const name = username.trim();
		const response = await api
			.post('/devs', { username: name })
			.catch(({ response }) => {
				setErrorMessage(response.data.message);
			});

		setLoading(false);
		if (response && response.data) {
			const { _id } = response.data;
			history.push(`/dev/${_id}`, { logged: response.data });
		}
	}

	return (
		<div className='login-container'>
			<form onSubmit={handleSubmit}>
				<Logo />
				{errorMessage && (
					<Alert title='Ops!' text={errorMessage} type='error' />
				)}
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
