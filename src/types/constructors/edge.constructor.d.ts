import { EdgeDTO } from '../entities/edge';
import { ActiveWorldEdge } from '../entities/world';

export interface IEdgeConstructor extends Omit<ICommonConstructor<ActiveWorldEdge>, 'delete' | 'list' | 'get'> {
  create: (worldId: string, dto: EdgeDTO) => Promise<string>;
  getByWorldId: (worldId: string) => ActiveWorldEdge;
  toggleEdgeStatus: (edgeId: string, isSolved: boolean) => Promise<boolean>;
  toggleRewardInEdge: (edgeId: string, rewardId: string) => Promise<boolean>;
}
