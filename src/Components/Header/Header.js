import React from 'react';
import classes from './Header.module.css';


const Header = () => {
    return(
        <header className={classes.header}>
        <img src="https://cdn.shopifycloud.com/hatchful-web/assets/5332ffcb554a06a5ecd7351a5309f011.svg" alt="logo"></img>
      </header>
    )
}

export default Header;