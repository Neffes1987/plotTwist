import { AbstractRepository, IListQuery } from '../../../base/abstractRepository';

import { CallModel, ICallModel } from './callModel';

export class CallRepository extends AbstractRepository<CallModel> {
  async list(page: number, limit: number): Promise<CallModel[]> {
    return super.getList({
      page,
      limit,
    });
  }

  createDbTable(): string {
    return '';
  }

  dbCreate(model: CallModel): Promise<string> {
    return Promise.resolve('');
  }

  dbDelete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  dbFind(id: string): Promise<Nullable<CallModel>> {
    return Promise.resolve(null);
  }

  dbFindAll(query: IListQuery): Promise<CallModel[]> {
    return Promise.resolve([]);
  }

  dbUpdate(model: CallModel): Promise<boolean> {
    return Promise.resolve(false);
  }

  generateModel(data: ICallModel): CallModel {
    return new CallModel(data);
  }
}
