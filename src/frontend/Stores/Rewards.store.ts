import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IRewardController } from '../../types/controllers/controller';

export class RewardsStore {
  rewards: RewardInEdgeDTO[] = [];
  private readonly crud: IRewardController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(): Promise<void> {
    const data = await this.crud.getRewards({});

    runInAction(() => {
      this.rewards = data;
    });
  }

  async update(dto: RewardDto): Promise<void> {
    await this.crud.saveReward(dto);
  }

  async delete(id: string): Promise<void> {
    await this.crud.removeReward(id);
    await this.list();
  }

  async create(dto: RewardInEdgeDTO): Promise<string> {
    const rewardId = await this.crud.saveReward(dto);

    runInAction(() => {
      this.rewards.push({ ...dto, id: rewardId });
    });

    return rewardId;
  }
}

export const rewardsStore = new RewardsStore();
