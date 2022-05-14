import { IAbstractModel } from '@backend/base/abstractModel';

import { AbstractRepository, IListQuery } from '../../../base/abstractRepository';

import { RewardModel } from './rewardModel';

export class RewardRepository extends AbstractRepository<RewardModel> {
  getDbTableColumns(): string {
    throw new Error('Method not implemented.');
  }

  generateModel(data: IAbstractModel): RewardModel {
    throw new Error('Method not implemented.');
  }

  dbFind(id: string): Promise<Nullable<RewardModel>> {
    throw new Error('Method not implemented.');
  }

  dbFindAll(query: IListQuery): Promise<RewardModel[]> {
    throw new Error('Method not implemented.');
  }

  dbDelete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  dbCreate(model: RewardModel): Promise<string> {
    throw new Error('Method not implemented.');
  }

  dbUpdate(model: RewardModel): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async list(props: IListQuery): Promise<RewardModel[]> {
    return super.getList(props);
  }
}
