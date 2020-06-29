import React from 'react';
import '../../global_colors.css';
import classes from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
    newMessagesCount: number
    theme: string
}

const Navbar: React.FC<PropsType> = ({newMessagesCount, theme}) => {
    return (
        <nav className={`${classes.nav} ${theme}_backgroundColor_nav`}>
            <div className={`${classes.item} ${theme}_nav_links`}><NavLink to="/profile" activeClassName={`active`}>Profile</NavLink>
            </div>
            <div className={`${classes.item} ${theme}_nav_links`}><NavLink to="/dialogs"
                                                   activeClassName={`active`}>Messages {newMessagesCount === 0 ?
                <span> </span> : <span>({newMessagesCount})</span>}</NavLink></div>
            <div className={`${classes.item} ${theme}_nav_links`}><NavLink to="/news" activeClassName={`active`}>News</NavLink></div>
            <div className={`${classes.item} ${theme}_nav_links`}><NavLink to="/music" activeClassName={`active`}>Music</NavLink></div>
            <div className={`${classes.item} ${theme}_nav_links`}><NavLink to="/setting" activeClassName={'active'}>Settings</NavLink>
            </div>
            <div className={`${classes.item} ${theme}_nav_links`}><NavLink to="/users" activeClassName={`active`}>Users</NavLink></div>
        </nav>
    )
}

export default Navbar;