import {SFC} from 'shared/types';

import TnbLogo from './logo.png';

interface ComponentProps {
  size?: number;
}

const Logo: SFC<ComponentProps> = ({className, size = 24}) => {
  return <img alt="thenewboston logo" className={className} src={TnbLogo} style={{height: size, width: size}} />;
};

export default Logo;
