import { MainEdgeType, ShadowEncounterType } from '../../constants/edge.enum';

interface EdgeDTO extends CommonEntityDTO {
  name: string;
  description: string;
  edgeImpact: string;
  type: 'edge' | 'mainEdge';
}

interface MainEdgeDTO extends EdgeDTO {
  mainEdgeType: MainEdgeType;
  edgeImpact: string;
  shadowEncounterType: ShadowEncounterType;
}
