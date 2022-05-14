import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';
import { UxException } from '../../../base/errors/uxException';

import { HiddenCaveWorldModel, IHiddenCaveWorldModel } from './hiddenCaveWorldModel';
import { HolidayWorldModel, IHolidayWorldModel } from './holidayWorldModel';
import { IPlainWorldWorld, PlainWorldModel } from './plainWorldModel';
import { IPrivateWorld, PrivateWorldModel } from './privateWorldModel';
import { IReturnWithPotionWorldModel, ReturnWithPotionWorldModel } from './returnWithPotionModel';
import { ICommonWorld, WorldModel } from './worldModel';

export interface IWorldListQuery extends IListQuery {
  plotId?: string;
  edgeId?: string;
}

export class WorldRepository extends AbstractRepository<WorldModel> {
  constructor() {
    super('world');
  }

  dbCreate(model: WorldModel): Promise<string> {
    return Promise.resolve('');
  }

  list(props: IWorldListQuery): Promise<WorldModel[]> {
    return super.getList<IWorldListQuery>(props);
  }

  removeAllByPlotId(plotId: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  async dbDelete(id: string): Promise<boolean> {
    try {
      await this.db.execute(`DELETE FROM ${this.tableName} WHERE worldId='${id}'`);
    } catch (e) {
      this.errorLog.add(e);
      throw new UxException('can_not_delete_world_by_id');
    }

    return true;
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
        return new PrivateWorldModel(data as IPrivateWorld);
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

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {
      id: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
      worldId: 'TEXT',
      story: 'TEXT',
      reference: 'TEXT',
      timeline: 'TEXT',
      failPrice: 'TEXT',
      status: 'TEXT',
      edgeId: 'TEXT',
      plotId: 'TEXT',
      worldType: 'TEXT',
    };
  }
}
