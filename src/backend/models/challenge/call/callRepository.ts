import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

import { CallModel, ICallModel } from './callModel';

export class CallRepository extends AbstractRepository<CallModel> {
  constructor() {
    super('call');
  }

  async list(props: IListQuery): Promise<CallModel[]> {
    return super.getList(props);
  }

  generateModel(data: ICallModel): CallModel {
    return new CallModel(data);
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      partyMotivation: 'TEXT',
      challengeId: 'TEXT',
      status: 'TEXT',
      type: 'TEXT',
    };
  }
}
