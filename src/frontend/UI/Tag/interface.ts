import { ColorType, TypographyMode } from '../interface';

export interface TagProps {
  text: string;
  color?: ColorType;
  textColor?: ColorType;
  size?: TypographyMode;
  margin?: number;
}
