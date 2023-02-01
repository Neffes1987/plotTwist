import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IEdgeController } from '../../types/controllers/controller';
import { EdgeDTO } from '../../types/entities/edge';

export class EdgeStore {
  edge: EdgeDTO;
  selectedRewards: string[] = [];
  private readonly crud: IEdgeController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async get(worldId: string): Promise<void> {
    this.edge = await this.crud.getEdgeByWorldId(worldId);
  }

  async toggleRewardInEdge(edgeId: string, rewardId: string): Promise<void> {
    await this.crud.toggleRewardInEdge(edgeId, rewardId);

    if (this.selectedRewards?.includes(rewardId)) {
      this.selectedRewards = this.selectedRewards.filter(selectedReward => selectedReward !== rewardId);
    } else {
      this.selectedRewards = [...this.selectedRewards, rewardId];
    }
  }

  async getSelectedRewardsByEdgeId(edgeId: string): Promise<void> {
    console.log('selected', await this.crud.getRewardsByEdgeId(edgeId));
    this.selectedRewards = (await this.crud.getRewardsByEdgeId(edgeId)) ?? [];
  }

  async save(worldId: string, dto: EdgeDTO): Promise<string> {
    if (!worldId) {
      return '';
    }

    if (dto.id) {
      await this.update(dto);

      return dto.id;
    }

    return this.create(worldId, dto);
  }

  private async update(dto: EdgeDTO): Promise<void> {
    await this.crud.saveEdge(dto);
  }

  private async create(worldId: string, dto: EdgeDTO): Promise<string> {
    const id = await this.crud.createEdge(worldId, dto);

    runInAction(() => {
      this.edge = { ...dto, id };
    });

    return id;
  }
}

export const edgeStore = new EdgeStore();
