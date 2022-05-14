import { AbstractRepository, IListQuery } from '../../../base/abstractRepository';

import { IWaterholeModel, WaterholeModel } from './waterholeModel';

export interface IWaterholeListQuery extends IListQuery {
  worldId?: string;
}

export class WaterholeRepository extends AbstractRepository<WaterholeModel> {
  async list(worldId: string): Promise<WaterholeModel[]> {
    return super.getList<IWaterholeListQuery>({
      worldId,
    });
  }

  getDbTableColumns(): string {
    return '';
  }

  dbCreate(model: WaterholeModel): Promise<string> {
    return Promise.resolve('');
  }

  dbDelete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  dbFind(id: string): Promise<Nullable<WaterholeModel>> {
    return Promise.resolve(null);
  }

  dbFindAll(query: IWaterholeListQuery): Promise<WaterholeModel[]> {
    return Promise.resolve([]);
  }

  dbUpdate(model: WaterholeModel): Promise<boolean> {
    return Promise.resolve(false);
  }

  generateModel(data: IWaterholeModel): WaterholeModel {
    return new WaterholeModel(data);
  }
}
