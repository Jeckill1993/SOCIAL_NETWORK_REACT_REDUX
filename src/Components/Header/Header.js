import React from 'react';
import '../../global_colors.css';
import classes from './Header.module.css';
import LoginButton from "../Login/LoginButton";
import LogOutButton from "../Login/LogOutButton";


const Header = (props) => {
  return (
    <header className={`${classes.header} ${props.theme}_backgroundColor_footer_header`}>
      <img src="https://www.logaster.ru/blog/wp-content/uploads/sites/2/2018/10/0023_p_world-travel-logo_19.png" alt="logo"/>
      <div className={classes.login_block}>
        {props.isAuth
          ? <LogOutButton login={props.login} logOut={props.logOut}/>
          : <LoginButton /> }
      </div>
    </header>
  )
}

export default Header;