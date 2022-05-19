import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

import { IRewardModel, RewardModel } from './rewardModel';

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
