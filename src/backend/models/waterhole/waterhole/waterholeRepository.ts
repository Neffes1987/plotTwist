import { IWaterholeListQuery, IWaterholeModel } from '@backend';

import { AbstractRepository } from '../../../base/abstractRepository';
import { ColumnsConfigType } from '../../../base/interface';

import { WaterholeModel } from './waterholeModel';

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
    return {
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      worldId: 'TEXT',
    };
  }
}
