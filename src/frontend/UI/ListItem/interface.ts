import { ReactElement } from 'react';

export interface ListItemProps {
  onPress: (propertyId: string) => void;
  propertyId: string;
  caption: string;
  noBorder?: boolean;
  icon?: ReactElement;
}
