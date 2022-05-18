import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

import { IWaterholeModel, WaterholeModel } from './waterholeModel';

export interface IWaterholeListQuery extends IListQuery {
  worldId?: string;
}

export class WaterholeRepository extends AbstractRepository<WaterholeModel> {
  constructor() {
    super('waterhole');
  }

  async list(worldId: string): Promise<WaterholeModel[]> {
    return super.getList<IWaterholeListQuery>({
      worldId,
    });
  }

  generateModel(data: IWaterholeModel): WaterholeModel {
    return new WaterholeModel(data);
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {};
  }
}
