import { ScrollViewProps } from 'react-native';

import { ScreenHeaderProps } from './ScreenHeader/interface';

export interface ScreenViewProps extends ScrollViewProps {
  header?: ScreenHeaderProps;
}
