import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';


const Header = (props) => {
  return (
    <header className={classes.header}>
      <img src="https://cdn.shopifycloud.com/hatchful-web/assets/5332ffcb554a06a5ecd7351a5309f011.svg" alt="logo"></img>
      <div className={classes.login_block}>
        {props.isAuth ? props.login : <NavLink to='/login'>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header;