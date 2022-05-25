import { AbstractRepository } from '../../../base/abstractRepository';
import { ColumnsConfigType, IAbstractModel, IListQuery } from '../../../base/interface';

import { ResultModel } from './resultModel';

export class ResultRepository extends AbstractRepository<ResultModel> {
  constructor() {
    super('result');
  }

  async list(props: IListQuery): Promise<ResultModel[]> {
    return super.getList(props);
  }

  generateModel(data: IAbstractModel): ResultModel {
    return new ResultModel(data);
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
    };
  }
}
