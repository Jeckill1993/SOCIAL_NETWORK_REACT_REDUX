import React from 'react';
import '../../global_colors.css';
import classes from './Header.module.css';
import LoginButton from "../Login/LoginButton";
import LogOutButton from "../Login/LogOutButton";

type PropsType = {
    isAuth: boolean
    login: string | null
    logOut: () => void
    theme: string
}

const Header: React.FC<PropsType> = ({isAuth, login, logOut, theme}) => {
  return (
    <header className={`${classes.header} ${theme}_backgroundColor_footer_header`}>
      <div className={classes.login_block}>
        {isAuth
          ? <LogOutButton login={login} logOut={logOut} theme={theme}/>
          : <LoginButton theme={theme}/> }
      </div>
    </header>
  )
}

export default Header;