import React from 'react';
import MarshOneHeader from '../../../projects/marsh-one/components/MarshOneHeader';

const LoggedOutHeader: React.FC<React.ComponentProps<typeof MarshOneHeader>> = (props) => {
  // Thin wrapper so marketing header can be consumed from components folder
  return <MarshOneHeader {...props} />;
};

export default LoggedOutHeader;
