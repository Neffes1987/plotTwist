import { MainEdgeType, ShadowEncounterType } from '../../constants/edge.enum';

import { TaskInEdgeDTO } from './task';

interface EdgeDTO extends CommonEntityDTO {
  name: string;
  description: string;
  edgeImpact: string;
  type: 'edge' | 'mainEdge';
  mainEdgeType?: MainEdgeType;
  shadowEncounterType?: ShadowEncounterType;
  rewards?: RewardInEdgeDTO[];
  tasks?: TaskInEdgeDTO[];
}
