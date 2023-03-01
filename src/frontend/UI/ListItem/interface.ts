import { IconType } from '../interface';

export interface ListItemProps {
  onEdit?: (propertyId: string) => void;
  onDelete?: (propertyId: string) => void;
  onOpen?: (propertyId: string) => void;
  propertyId: string;
  caption: string;
  noBorder?: boolean;
  selected?: boolean;
  icon?: IconType;
  customIcon?: IconType;
}
