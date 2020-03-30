import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import AvatarNav from '../AvatarNav/AvatarNav.js';


const Navbar = (props) => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}><NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink></div>
      <div className={classes.item}><NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink></div>
      <div className={classes.item}><NavLink to="/news" activeClassName={classes.active}>News</NavLink></div>
      <div className={classes.item}><NavLink to="/music" activeClassName={classes.active}>Music</NavLink></div>
      <div className={classes.item}><NavLink to="/setting" activeClassName={classes.active}>Settings</NavLink></div>
      <br></br>
      <div className={classes.item}><NavLink to="/friends" activeClassName={classes.active}>Friends</NavLink>
        <AvatarNav />
      </div>
    </nav>
  )

}

export default Navbar;
