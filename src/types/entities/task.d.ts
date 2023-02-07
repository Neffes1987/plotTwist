import { TaskStatus } from '../../constants/status.enum';

interface TaskDTO extends CommonEntityDTO {
  name: string;
  description: string;
  plotGoal: string;
}

interface TaskInEdgeDTO extends TaskDTO {
  isAssigned?: boolean;
  weight?: number;
  status?: TaskStatus;
}
