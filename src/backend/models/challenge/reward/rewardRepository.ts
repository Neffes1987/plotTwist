import { IAbstractModel } from '@backend/base/abstractModel';

import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

import { RewardModel } from './rewardModel';

export class RewardRepository extends AbstractRepository<RewardModel> {
  constructor() {
    super('reward');
  }

  generateModel(data: IAbstractModel): RewardModel {
    throw new Error('Method not implemented.');
  }

  async list(props: IListQuery): Promise<RewardModel[]> {
    return super.getList(props);
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {};
  }
}
