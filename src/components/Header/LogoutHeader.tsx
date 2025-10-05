import React from 'react';
import styles from './LogoutHeader.module.scss';

// Example logo asset from Figma export
const MARSH_LOGO = 'http://localhost:3845/assets/7f4c6244932047b9869ef078283c24857c95c468.svg';

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
