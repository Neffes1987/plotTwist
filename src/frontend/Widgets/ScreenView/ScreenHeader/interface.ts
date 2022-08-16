import { IconType } from '../../../UI/interface';

export interface ScreenHeaderProps {
  onBackClick?: () => void;
  onRightIconClick?: () => void;
  rightIconType?: IconType;
  title: string;
  subtitle?: string;
}
