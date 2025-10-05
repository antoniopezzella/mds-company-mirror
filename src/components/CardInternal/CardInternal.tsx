import React from "react";
import styles from "./CardInternal.module.scss";

export interface CardInternalProps {
  title: string;
  badgeText?: string;
  badgeColor?: "primary" | "default";
  subtitle?: string;
  from?: string;
  to?: string;
  savings?: string;
  leftIconUrl?: string;
  rightIconUrl?: string;
  children?: React.ReactNode;
}

const CardInternal: React.FC<CardInternalProps> = ({
  title,
  badgeText,
  badgeColor = "primary",
  subtitle,
  from,
  to,
  savings,
  leftIconUrl,
  rightIconUrl,
  children,
}) => (
  <section className={styles.card}>
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>{title}</h3>
        {badgeText && (
          <span className={badgeColor === "primary" ? styles.badgePrimary : styles.badgeDefault}>{badgeText}</span>
        )}
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
    <div className={styles.content}>
      <div className={styles.limitsRow}>
        {from && <span className={styles.limitsFrom}>{from}</span>}
        {to && <span className={styles.limitsTo}>to {to}</span>}
      </div>
      {savings && <div className={styles.savings}>{savings}</div>}
      {children}
    </div>
    <footer className={styles.footer}>
      {leftIconUrl && <img src={leftIconUrl} alt="Left Icon" className={styles.icon} />}
      {rightIconUrl && <img src={rightIconUrl} alt="Right Icon" className={styles.icon} />}
    </footer>
  </section>
);

export default CardInternal;
