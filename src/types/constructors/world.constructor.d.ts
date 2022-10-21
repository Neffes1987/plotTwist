import { WorldEnum } from '../../constants/world.enum';
import { ActivePlotWorld, WorldDTO } from '../entities/world';

export interface IWorldConstructor extends Omit<ICommonConstructor<WorldDTO>, 'list' | 'delete' | 'get' | 'create'> {
  list: (plotId: string) => Promise<ActivePlotWorld[]>;
  create: (plotId: string, dto: WorldDTO) => Promise<string>;
  get: (worldId: string, dto: WorldEnum) => Promise<WorldDTO>;
  toggleWorldLawRelation: (lawId: string, worldId: string) => Promise<boolean>;
  toggleWorldWaterholeRelation: (waterholeId: string, worldId: string) => Promise<boolean>;
  toggleWorldLawStatus: (lawId: string, isBroken: boolean) => Promise<boolean>;
}
