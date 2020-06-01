import React from 'react';
import '../../global_colors.css';
import styles from '../Header/Header.module.css';

const Footer = ({theme, changeTheme}) => {
    return (
        <div className={`${styles.footer} ${theme}_backgroundColor_footer_header`}>
            <button className={`${theme}_header_footerBtn`} onClick={() => {changeTheme('runnyTheme')}}>Runny Theme</button>
            <button className={`${theme}_header_footerBtn`} onClick={() => {changeTheme('sunnyTheme')}}>Woody Theme</button>
        </div>
    )
}

export default Footer;