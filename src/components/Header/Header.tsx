import React from 'react';
import DashboardHeader, { type DashboardHeaderProps } from './DashboardHeader/DashboardHeader';
import WebsiteHeader, { type WebsiteHeaderProps, type WebsiteHeaderNavItem } from '../ui/website-header';

export type HeaderProps =
  | ({ type?: 'dashboard' } & DashboardHeaderProps)
  | ({ type: 'website' } & WebsiteHeaderProps);

const Header: React.FC<HeaderProps> = (props) => {
  if (props.type === 'website') {
    const websiteProps: WebsiteHeaderProps = { ...props };
    delete (websiteProps as WebsiteHeaderProps & { type?: HeaderProps['type'] }).type;
    return <WebsiteHeader {...websiteProps} />;
  }

  const dashboardProps: DashboardHeaderProps = { ...props };
  delete (dashboardProps as DashboardHeaderProps & { type?: HeaderProps['type'] }).type;
  return <DashboardHeader {...dashboardProps} />;
};

export default Header;
export { Header, DashboardHeader, WebsiteHeader };
export type { DashboardHeaderProps, WebsiteHeaderProps, WebsiteHeaderNavItem };
