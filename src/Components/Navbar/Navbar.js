import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from 'react-router-dom';


const Navbar = ({newMessagesCount}) => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}><NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
            </div>
            <div className={classes.item}><NavLink to="/dialogs"
                                                   activeClassName={classes.active}>Messages {newMessagesCount === 0 ?
                <span> </span> : <span>({newMessagesCount})</span>}</NavLink></div>
            <div className={classes.item}><NavLink to="/news" activeClassName={classes.active}>News</NavLink></div>
            <div className={classes.item}><NavLink to="/music" activeClassName={classes.active}>Music</NavLink></div>
            <div className={classes.item}><NavLink to="/setting" activeClassName={classes.active}>Settings</NavLink>
            </div>
            <div className={classes.item}><NavLink to="/users" activeClassName={classes.active}>Users</NavLink></div>
        </nav>
    )

}

export default Navbar;
