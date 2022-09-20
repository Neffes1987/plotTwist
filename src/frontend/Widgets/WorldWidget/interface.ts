import { WorldDTO } from 'backend';

import { TypographyProps } from '../../UI/interface';

export interface WorldWidgetProps {
  worldInfo: WorldDTO;
  onEditWorld: (type: WorldDTO['type'], id: string) => void;
  onOpenWorldProperty: (propertyType: string) => void;
}

export interface PropertyRowProps extends TypographyProps {
  onPress: (propertyId: string) => void;
  caption: string;
  quantity?: string;
  id: string;
  showAlert?: boolean;
}
