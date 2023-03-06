import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IEdgeRewardController } from '../../../../types/controllers/controller';

export class EdgeRewardsStore {
  rewards: RewardInEdgeDTO[] = [];
  private readonly crud: IEdgeRewardController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(parentId: string): Promise<void> {
    const data = await this.crud.getRewardsInEdge(parentId);

    runInAction(() => {
      this.rewards = data;
    });
  }

  async toggleEdgeRewards(rewardsIds: string[], parentId?: string): Promise<void> {
    if (!parentId) {
      return;
    }

    const data = await this.crud.toggleEdgeRewards(rewardsIds, parentId);

    runInAction(() => {
      this.rewards = data;
    });
  }
}

export const edgeRewardsStore = new EdgeRewardsStore();
