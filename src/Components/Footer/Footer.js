import React from 'react';
import styles from '../Header/Header.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <button>Dare theme</button>
            <button>Light theme</button>
        </div>
    )
}

export default Footer;