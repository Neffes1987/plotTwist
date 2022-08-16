import { ColorType, FlexProps } from '../interface';

export interface CardProps extends FlexProps {
  title?: string;
  color?: ColorType;
  bordered?: boolean;
}
