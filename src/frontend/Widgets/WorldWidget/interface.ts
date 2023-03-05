import { InWorldCharacterDTO } from '../../../types/entities/character';
import { ActivePlotWorld, WorldDTO } from '../../../types/entities/world';
import { TypographyProps } from '../../UI/interface';

export interface PropertyProps {
  type: 'npc' | 'edge' | 'world' | 'reward';
  id: string;
  parentId: string;
}

export interface WorldWidgetProps {
  worldInfo: ActivePlotWorld;
  characters: InWorldCharacterDTO[];
  onEditWorld: (type: WorldDTO['type'], id: string) => void;
  onOpenWorldProperty: (options: PropertyProps) => void;
}

export interface PropertyRowProps extends TypographyProps {
  onPress: (propertyId: string) => void;
  caption: string;
  quantity?: string;
  id: string;
  showAlert?: boolean;
}
