import React from 'react';
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MARSH_LOGO from '../../../assets/images/marsh.svg';
import DSButton from '../../Button/Button';
import { getRoleColor } from '../../../theme/roles';
import styles from '../Header.module.scss';

export interface WebsiteHeaderNavItem {
  label: string;
  href?: string;
  hasMenu?: boolean;
}

export interface WebsiteHeaderProps {
  navItems?: WebsiteHeaderNavItem[];
  activeNavLabel?: string;
  languageLabel?: string;
  signInLabel?: string;
  contactLabel?: string;
  signInHref?: string;
  contactHref?: string;
  offsetTop?: number;
  position?: 'fixed' | 'sticky' | 'static';
  onSearchClick?: () => void;
  onContactClick?: () => void;
  onSignInClick?: () => void;
}

const defaultNavItems: WebsiteHeaderNavItem[] = [
  { label: 'Solutions', href: '#solutions', hasMenu: true },
  { label: 'Who we are', href: '#who-we-are', hasMenu: true },
  { label: 'Ai Hub', href: '#ai-hub', hasMenu: true },
  { label: 'Insights', href: '#insights', hasMenu: true },
  { label: 'Shop', href: '#shop', hasMenu: true },
];

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({
  navItems = defaultNavItems,
  activeNavLabel = 'Solutions',
  languageLabel = 'English (US)',
  signInLabel = 'Sign in',
  contactLabel = 'Contact us',
  signInHref,
  contactHref,
  offsetTop = 0,
  position = 'fixed',
  onSearchClick,
  onContactClick,
  onSignInClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const handleSignIn = () => {
    if (onSignInClick) {
      onSignInClick();
      return;
    }

    if (signInHref) {
      window.location.href = signInHref;
    }
  };
  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
      return;
    }

    if (contactHref) {
      window.location.href = contactHref;
    }
  };

  return (
    <>
      <AppBar
        component="header"
        position={position}
        elevation={0}
        className={styles.websiteHeader}
        sx={{ top: position === 'fixed' || position === 'sticky' ? offsetTop : undefined }}
      >
        <Toolbar disableGutters className={styles.websiteHeader__toolbar}>
          <Box className={styles.websiteHeader__left}>
            <a 
              className={styles.websiteHeader__brand} 
              href="/" 
              aria-label="Marsh home"
              style={{ color: getRoleColor('text.onHero') }}
            >
              <img src={MARSH_LOGO} alt="Marsh Logo" className={styles.websiteHeader__logo} />
            </a>

            <nav className={styles.websiteHeader__nav} aria-label="Primary navigation">
              {navItems.map((item) => {
                const isActive = item.label === activeNavLabel;

                return (
                  <a
                    key={item.label}
                    href={item.href ?? '#'}
                    className={`${styles.websiteHeader__navLink} ${isActive ? styles.websiteHeader__navLinkActive : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    style={{ color: getRoleColor('text.onHero') }}
                  >
                    <span>{item.label}</span>
                    {item.hasMenu && <KeyboardArrowDownIcon aria-hidden className={styles.websiteHeader__navIcon} />}
                  </a>
                );
              })}
            </nav>
          </Box>

          <Box className={styles.websiteHeader__actions}>
            <DSButton
              className={styles.websiteHeader__iconButton}
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Search"
              onClick={onSearchClick}
              sx={{
                color: getRoleColor('text.onHero'),
                '&:hover': { 
                  color: getRoleColor('text.onHero'),
                  backgroundColor: 'rgba(206, 236, 255, 0.1)' 
                }
              }}
            >
              <SearchIcon />
            </DSButton>

            <Box className={styles.websiteHeader__desktopOnly}>
              <DSButton
                variant="ghost"
                size="sm"
                startIcon={<LanguageIcon fontSize="small" />}
                endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                aria-label={`Language: ${languageLabel}`}
                sx={{
                  color: getRoleColor('text.onHero'),
                  '&:hover': { 
                    color: getRoleColor('text.onHero'),
                    backgroundColor: 'rgba(206, 236, 255, 0.1)' 
                  }
                }}
              >
                {languageLabel}
              </DSButton>
            </Box>

            <Box className={styles.websiteHeader__desktopTablet}>
              <DSButton
                variant="ghost"
                size="sm"
                onClick={handleSignIn}
                sx={{
                  color: getRoleColor('text.onHero'),
                  '&:hover': { 
                    color: getRoleColor('text.onHero'),
                    backgroundColor: 'rgba(206, 236, 255, 0.1)' 
                  }
                }}
              >
                {signInLabel}
              </DSButton>

              <DSButton
                variant="secondary"
                size="sm"
                onClick={handleContact}
                sx={{
                  color: getRoleColor('text.onHero'),
                  borderColor: getRoleColor('text.onHero'),
                  '&:hover': { 
                    color: getRoleColor('text.onHero'),
                    borderColor: getRoleColor('text.onHero'),
                    backgroundColor: 'rgba(206, 236, 255, 0.1)' 
                  }
                }}
              >
                {contactLabel}
              </DSButton>
            </Box>

            <DSButton
              className={styles.websiteHeader__menuButton}
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={{
                color: getRoleColor('text.onHero'),
                '&:hover': { 
                  color: getRoleColor('text.onHero'),
                  backgroundColor: 'rgba(206, 236, 255, 0.1)' 
                }
              }}
            >
              <MenuIcon />
            </DSButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        className={styles.websiteHeader__drawer}
      >
        <Box className={styles.websiteHeader__drawerContent}>
          <Box className={styles.websiteHeader__drawerTop}>
            <img src={MARSH_LOGO} alt="Marsh Logo" />
            <DSButton
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <CloseIcon />
            </DSButton>
          </Box>

          <List className={styles.websiteHeader__drawerNav}>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component="a" href={item.href ?? '#'} onClick={closeMobileMenu}>
                  <ListItemText primary={item.label} />
                  {item.hasMenu && <KeyboardArrowDownIcon aria-hidden />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box className={styles.websiteHeader__drawerActions}>
            <DSButton variant="ghost" size="md" startIcon={<LanguageIcon fontSize="small" />}>
              {languageLabel}
            </DSButton>
            <DSButton variant="ghost" size="md" onClick={handleSignIn}>
              {signInLabel}
            </DSButton>
            <DSButton variant="secondary" size="md" onClick={handleContact}>
              {contactLabel}
            </DSButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default WebsiteHeader;
