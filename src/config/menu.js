import React from 'react';
import Exit from '@material-ui/icons/PowerSettingsNew';

const menuItemsLinks = id => {
    return [
        {
            label: 'Devs com Likes',
            url: `/dev/${id}/likeds`,
            icon: null
        },
        {
            label: 'Devs com Dislikes',
            url: `/dev/${id}/unlikeds`,
            icon: null
        },
        {
            label: 'Devs não avaliados',
            url: `/dev/${id}`,
            icon: null
        },
        {
            label: 'Sair',
            url: `/`,
            icon: <Exit />
        }
    ];
};

export default menuItemsLinks;
