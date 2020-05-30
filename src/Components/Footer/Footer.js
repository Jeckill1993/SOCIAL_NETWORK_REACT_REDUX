import React from 'react';
import '../../global_colors.css';
import styles from '../Header/Header.module.css';

const Footer = () => {
    return (
        <div className={`${styles.footer} runnyTheme_backgroundColor_footer_header`}>
            <button className={`runnyTheme_header_footerBtn`}>Dare theme</button>
            <button className={`runnyTheme_header_footerBtn`}>Light theme</button>
        </div>
    )
}

export default Footer;