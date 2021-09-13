import { DefaultTheme } from "styled-components";
import {colors, constants, fonts, mixins} from '@renderer/styles';


export interface Theme extends DefaultTheme {
  colors: typeof colors;
  constants: typeof constants;
  fonts: typeof fonts;
  mixins: typeof mixins;
}
