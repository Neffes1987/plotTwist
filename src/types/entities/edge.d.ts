import { MainEdgeType, ShadowEncounterType } from '../../constants/edge.enum';

interface EdgeDTO extends CommonEntityDTO {
  name: string;
  description: string;
  edgeImpact: string;
  type: 'edge' | 'mainEdge';
  mainEdgeType?: MainEdgeType;
  shadowEncounterType?: ShadowEncounterType;
}
