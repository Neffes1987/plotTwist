import { ActiveWorldEdge } from '../entities/world';

export interface IEdgeConstructor extends Omit<ICommonConstructor<ActiveWorldEdge, 'delete' | 'list' | 'get'>> {
  getByWorldId: (worldId: string) => ActiveWorldEdge;
  toggleEdgeStatus: (edgeId: string, isSolved: boolean) => Promise<boolean>;
}
