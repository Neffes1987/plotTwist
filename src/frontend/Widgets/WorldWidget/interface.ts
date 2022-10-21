import { ActivePlotWorld, WorldDTO } from '../../../types/entities/world';
import { TypographyProps } from '../../UI/interface';

export interface WorldWidgetProps {
  worldInfo: ActivePlotWorld;
  onEditWorld: (type: WorldDTO['type'], id: string) => void;
  onOpenWorldProperty: (propertyType: string, worldId: string) => void;
}

export interface PropertyRowProps extends TypographyProps {
  onPress: (propertyId: string) => void;
  caption: string;
  quantity?: string;
  id: string;
  showAlert?: boolean;
}
