import { AbstractRepository, IListQuery } from '../../../base/abstractRepository';
import { UxException } from '../../../base/errors/uxException';

import { HiddenCaveWorldModel, IHiddenCaveWorldModel } from './hiddenCaveWorldModel';
import { HolidayWorldModel, IHolidayWorldModel } from './holidayWorldModel';
import { IPlainWorldWorld, PlainWorldModel } from './plainWorldModel';
import { IPrivateWorld, PrivateWorld } from './privateWorldModel';
import { IReturnWithPotionWorldModel, ReturnWithPotionWorldModel } from './returnWithPotionModel';
import { ICommonWorld, WorldModel } from './worldModel';

export interface IWorldListQuery extends IListQuery {
  plotId?: string;
  edgeId?: string;
}

export class WorldRepository extends AbstractRepository<WorldModel> {
  dbCreate(model: WorldModel): Promise<string> {
    return Promise.resolve('');
  }

  list(props: IWorldListQuery): Promise<WorldModel[]> {
    return super.getList<IWorldListQuery>(props);
  }

  removeAllByPlotId(plotId: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  getIdsByPlot(plotId: string): Promise<string[]> {
    return Promise.resolve([]);
  }

  dbDelete(id: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  dbFind(id: string): Promise<Nullable<WorldModel>> {
    return Promise.resolve(null);
  }

  dbUpdate(model: WorldModel): Promise<boolean> {
    return Promise.resolve(true);
  }

  generateModel(data: ICommonWorld): WorldModel {
    switch (data.worldType) {
      case 'plainWorld':
        return new PlainWorldModel(data as IPlainWorldWorld);
      case 'privateWorld':
        return new PrivateWorld(data as IPrivateWorld);
      case 'hiddenCave':
        return new HiddenCaveWorldModel(data as IHiddenCaveWorldModel);
      case 'holiday':
        return new HolidayWorldModel(data as IHolidayWorldModel);
      case 'returnWithPotion':
        return new ReturnWithPotionWorldModel(data as IReturnWithPotionWorldModel);

      default:
        throw new UxException('wrong_world_type');
    }
  }

  dbFindAll(query: IWorldListQuery): Promise<WorldModel[]> {
    return Promise.resolve([]);
  }

  createDbTable(): string {
    return '';
  }
}
