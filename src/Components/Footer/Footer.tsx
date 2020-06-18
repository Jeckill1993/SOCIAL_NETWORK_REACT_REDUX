import React from 'react';
import '../../global_colors.css';
import styles from '../Header/Header.module.css';

type PropsType = {
    theme: string
    changeTheme: (theme: string) => void
}

const Footer: React.FC<PropsType> = ({theme, changeTheme}) => {
    return (
        <div className={`${styles.footer} ${theme}_backgroundColor_footer_header`}>
            <button className={`${theme}_header_footerBtn`} onClick={() => {changeTheme('runnyTheme');
            localStorage.setItem('theme', 'runnyTheme')}}>Runny Theme</button>
            <button className={`${theme}_header_footerBtn`} onClick={() => {changeTheme('sunnyTheme');
            localStorage.setItem('theme', 'sunnyTheme')}}>Woody Theme</button>
        </div>
    )
}

export default Footer;