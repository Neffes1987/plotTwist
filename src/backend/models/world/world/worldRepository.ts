import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';
import { UxException } from '../../../base/errors/uxException';

import { HiddenCaveWorldModel, IHiddenCaveWorldModel } from './hiddenCaveWorldModel';
import { HolidayWorldModel, IHolidayWorldModel } from './holidayWorldModel';
import { IPlainWorldWorld, PlainWorldModel } from './plainWorldModel';
import { IPrivateWorld, PrivateWorldModel } from './privateWorldModel';
import { IReturnWithPotionWorldModel, ReturnWithPotionWorldModel } from './returnWithPotionModel';
import { ICommonWorld, WorldModel, WorldType } from './worldModel';

export interface IWorldListQuery extends IListQuery {
  plotId?: string;
  edgeId?: string;
}

export class WorldRepository extends AbstractRepository<WorldModel> {
  static readonly _columns: Record<WorldType | 'general', Record<string, ColumnsConfigType>> = {
    general: {
      id: 'TEXT',
      description: 'TEXT',
      name: 'TEXT',
      story: 'TEXT',
      reference: 'TEXT',
      timeline: 'TEXT',
      failPrice: 'TEXT',
      status: 'TEXT',
      edgeId: 'TEXT',
      plotId: 'TEXT',
      worldType: 'TEXT',
    },
    plainWorld: {
      introduction: 'TEXT',
      charactersProblems: 'TEXT',
      worldProblems: 'TEXT',
    },
    privateWorld: {
      contrast: 'TEXT',
    },
    returnWithPotion: {
      finalType: 'TEXT',
      potionType: 'TEXT',
      plotTwist: 'TEXT',
    },
    holiday: {
      shadowRevenge: 'TEXT',
      holidayType: 'TEXT',
      HolidaySubType: 'TEXT',
      chaseType: 'TEXT',
    },
    hiddenCave: {
      mainEdgeInformation: 'TEXT',
      shadowIntroduction: 'TEXT',
      partyPlan: 'TEXT',
    },
  };

  constructor() {
    super('world');
  }

  list(props: IWorldListQuery): Promise<WorldModel[]> {
    return super.getList<IWorldListQuery>(props);
  }

  async removeAllByPlotId(plotId: string): Promise<boolean> {
    try {
      await this.db.execute(this.generateDeleteQuery(`plotId='${plotId}'`));
    } catch (e) {
      this.errorLog.add(e);
      throw new UxException('can_not_delete_worlds_by_plot_id');
    }

    return true;
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

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {
      ...WorldRepository._columns.general,
      ...WorldRepository._columns.plainWorld,
      ...WorldRepository._columns.privateWorld,
      ...WorldRepository._columns.holiday,
      ...WorldRepository._columns.hiddenCave,
      ...WorldRepository._columns.returnWithPotion,
    };
  }
}
