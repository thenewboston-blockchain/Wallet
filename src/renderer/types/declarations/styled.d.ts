import 'styled-components';
import {Theme} from '../styles';

declare module 'styled-components' {
  export type DefaultTheme = Theme;
}
