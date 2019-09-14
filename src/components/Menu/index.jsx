import React from 'react';
import './style.css';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

export default function SimpleMenu({ links, history, logged }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    links = links === undefined ? [] : links;

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleRedirect(url) {
        history.push(url, { logged });
        handleClose();
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div className='custom-menu'>
            <MenuIcon onClick={handleClick} title='Open menu' />
            <Menu
                id='menu-items-custom'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {links.map((link, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleRedirect(link.url)}
                    >
                        {link.icon} {link.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
