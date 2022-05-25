import { IRewardModel } from '@backend';

import { AbstractRepository } from '../../../base/abstractRepository';
import { ColumnsConfigType, IListQuery } from '../../../base/interface';

import { RewardModel } from './rewardModel';

export class RewardRepository extends AbstractRepository<RewardModel> {
  constructor() {
    super('reward');
  }

  generateModel(data: IRewardModel): RewardModel {
    return new RewardModel(data);
  }

  async list(props: IListQuery): Promise<RewardModel[]> {
    return super.getList(props);
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      challengeId: 'TEXT',
    };
  }
}
