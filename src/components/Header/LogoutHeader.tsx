import React from 'react';
import styles from './LogoutHeader.module.scss';
import MARSH_LOGO from '../../assets/images/marsh.svg';

const LogoutHeader: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.logoSection}>
        <img src={MARSH_LOGO} alt="Marsh Logo" className={styles.logo} />
      </div>
      <div className={styles.rightSection}>
        <button className={styles.signInButton}>Sign In</button>
      </div>
    </div>
  </header>
);

export default LogoutHeader;
