import {AbstractRepository, IListQuery} from '../../../base/abstractRepository';

import {IWaterholeModel, WaterholeModel} from './waterholeModel';

export class WaterholeRepository extends AbstractRepository<WaterholeModel> {
  async list(page: number, limit: number): Promise<WaterholeModel[]> {
    return super.getList<IListQuery>({
      page,
      limit,
    });
  }

  createDbTable(): string {
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

  dbFindAll(query: IListQuery): Promise<WaterholeModel[]> {
    return Promise.resolve([]);
  }

  dbUpdate(model: WaterholeModel): Promise<boolean> {
    return Promise.resolve(false);
  }

  generateModel(data: IWaterholeModel): WaterholeModel {
    return new WaterholeModel(data);
  }
}
