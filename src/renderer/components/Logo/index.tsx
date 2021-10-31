import {SFC} from 'shared/types';

import TnbLogo from './logo.png';

export interface LogoProps {
  size?: number;
}

const Logo: SFC<LogoProps> = ({className, size = 24}) => {
  return <img alt="thenewboston logo" className={className} src={TnbLogo} style={{height: size, width: size}} />;
};

export default Logo;
