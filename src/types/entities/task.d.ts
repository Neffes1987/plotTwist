import { MainEdgeType, ShadowEncounterType } from '../../constants/edge.enum';

type TaskDTO = CommonEntityDTO & {
  name: string;
  description: string;
  edgeImpact: string;
  type: 'edge' | 'mainEdge' | 'task';
  mainEdgeType?: MainEdgeType;
  shadowEncounterType?: ShadowEncounterType;
};
