import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IWorldEdgeController } from '../../../../types/controllers/controller';
import { TaskInWorldDTO } from '../../../../types/entities/task';

export class WorldEdgeStore {
  edge: Nullable<TaskInWorldDTO> = null;
  private readonly crud: IWorldEdgeController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(worldId: string): Promise<void> {
    const data = await this.crud.getEdgesInWorld(worldId);

    runInAction(() => {
      this.edge = data[0];
    });
  }

  async toggleWorldEdge(waterholesId: string, worldId: string): Promise<void> {
    const data = await this.crud.toggleWorldEdges(waterholesId ? [waterholesId] : [], worldId);

    runInAction(() => {
      this.edge = data[0];
    });
  }
}

export const worldEdgeStore = new WorldEdgeStore();
