import { InWorldCharacterDTO } from '../../../types/entities/character';
import { TaskInWorldDTO } from '../../../types/entities/task';
import { ActivePlotWorld, WorldDTO } from '../../../types/entities/world';
import { TypographyProps } from '../../UI/interface';

export interface PropertyProps {
  type: 'npc' | 'edge' | 'world' | 'reward';
  id: string;
  parentId: string;
}

export interface WorldWidgetProps {
  worldInfo: ActivePlotWorld;
  laws: LawInWorldDTO[];
  edge: Nullable<TaskInWorldDTO>;
  waterholes: WaterholeInWorldDTO[];
  characters: InWorldCharacterDTO[];
  rewards: RewardInEdgeDTO[];
  tasks: TaskInWorldDTO[];
  onToggleWorld: (worldId: string) => void;
  isOpenWorld: boolean;
  onEditWorld: (type: WorldDTO['type'], id: string) => void;
}

export interface PropertyRowProps extends TypographyProps {
  onPress?: (propertyId: string) => void;
  caption: string;
  quantity?: string;
  id: string;
  showAlert?: boolean;
}
