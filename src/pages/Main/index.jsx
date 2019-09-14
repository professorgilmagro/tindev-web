import React, { useEffect, useState } from 'react';
import Logo from '../../components/Logo';
import UserCard from '../../components/CardView/User';
import MatchCard from '../../components/CardView/Match';
import MessageNoItems from '../../components/MessageNoItems';
import Loading from '../../components/Loading';
import Menu from '../../components/Menu';
import api from '../../services/api';
import socket from '../../services/socket';
import menuItemsLinks from '../../config/menu';
import './style.css';

export default function Main({ match, location, history }) {
    const { logged } = location.state;
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);
    const [loading, setLoading] = useState(true);
    const { filterBy } = match.params;

    useEffect(() => {
        async function loadUsers() {
            let url = '/devs';

            if (filterBy) {
                url = `/devs/${filterBy}`;
            }

            const response = await api.get(url, {
                headers: { user: match.params.id }
            });

            setUsers(response.data);
            setLoading(false);
        }
        loadUsers();
    }, [match.params.id, filterBy]);

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

    function getExtraInfo(dev) {
        if (dev.repositories === undefined || dev.repositories.length === 0) {
            return [];
        }

        const info = { jobs: [], languages: [] };
        dev.repositories.map(({ language, name, url }) => {
            if (language && !info.languages.includes(language)) {
                info.languages.push(language);
            }

            info.jobs.push({ name, url });
            return info;
        });

        return info;
    }

    return (
        <div className='main-container'>
            <Logo linkTo='/' />
            <h4 className='logged-user'>{logged.name}</h4>
            <Loading loading={loading} />
            {!loading && (
                <Menu
                    history={history}
                    logged={logged}
                    links={menuItemsLinks(match.params.id)}
                />
            )}
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <UserCard
                            id={user._id}
                            name={user.name}
                            username={user.user}
                            location={user.location}
                            extraInfo={getExtraInfo(user)}
                            description={user.bio}
                            avatar={user.avatar}
                            likeCallback={handleLike}
                            unlikeCallback={handleUnlike}
                            showIconUp={filterBy === 'likeds'}
                            showIconDown={filterBy === 'unlikeds'}
                            showButtons={!filterBy}
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
