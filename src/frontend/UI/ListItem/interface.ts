import { IconType } from '../interface';

export interface ListItemProps {
  onEdit?: (propertyId: string) => void;
  onOpen: (propertyId: string) => void;
  propertyId: string;
  caption: string;
  noBorder?: boolean;
  icon?: IconType;
}
