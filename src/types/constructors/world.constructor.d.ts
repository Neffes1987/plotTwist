import { WorldEnum } from '../../constants/world.enum';
import { WorldDTO } from '../entities/world';

export interface IWorldConstructor extends Omit<ICommonConstructor<WorldDTO>, 'list' | 'delete' | 'get' | 'create'> {
  list: (plotId: string) => Promise<WorldDTO[]>;
  create: (plotId: string, dto: WorldDTO) => Promise<string>;
  get: (worldId: string, dto: WorldEnum) => Promise<WorldDTO>;
}
