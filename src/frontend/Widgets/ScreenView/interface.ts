import { ScrollViewProps } from 'react-native';

import { ColorType } from '../../UI/interface';

import { ScreenHeaderProps } from './ScreenHeader/interface';

export interface ScreenViewProps extends ScrollViewProps {
  header?: ScreenHeaderProps;
  bgColor?: ColorType;
}
