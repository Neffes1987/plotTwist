import {IAbstractModel} from '../../../base/abstractModel';
import {AbstractRepository, IListQuery} from '../../../base/abstractRepository';

import {ResultModel} from './resultModel';

export class ResultRepository extends AbstractRepository<ResultModel> {
  async list(page: number, limit: number): Promise<ResultModel[]> {
    return super.getList({
      page,
      limit,
    });
  }

  createDbTable(): string {
    return '';
  }

  dbCreate(model: ResultModel): Promise<string> {
    return Promise.resolve('');
  }

  dbDelete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  dbFind(id: string): Promise<Nullable<ResultModel>> {
    return Promise.resolve(null);
  }

  dbFindAll(query: IListQuery): Promise<ResultModel[]> {
    return Promise.resolve([]);
  }

  dbUpdate(model: ResultModel): Promise<boolean> {
    return Promise.resolve(false);
  }

  generateModel(data: IAbstractModel): ResultModel {
    return new ResultModel(data);
  }
}
