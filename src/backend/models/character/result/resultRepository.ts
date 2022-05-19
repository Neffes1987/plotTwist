import { IAbstractModel } from '../../../base/abstractModel';
import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

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
