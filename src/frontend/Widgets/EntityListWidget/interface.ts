import { CallDTO } from '../../../types/entities/call';
import { CharacterDTO } from '../../../types/entities/character';
import { TaskDTO } from '../../../types/entities/task';

export interface CommonEntityWidgetProps<T extends CommonEntityDTO> {
  data: T;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export type CharacterWidgetProps = CommonEntityWidgetProps<CharacterDTO>;
export type TaskWidgetProps = CommonEntityWidgetProps<TaskDTO>;
export type CallsWidgetProps = CommonEntityWidgetProps<CallDTO>;
