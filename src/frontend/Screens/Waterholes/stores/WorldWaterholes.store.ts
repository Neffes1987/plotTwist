import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IWorldWaterholesController } from '../../../../types/controllers/controller';

export class WorldWaterholesStore {
  waterholeDTOS: WaterholeInWorldDTO[] = [];
  private readonly crud: IWorldWaterholesController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(worldId: string): Promise<void> {
    const data = await this.crud.getWaterholesInWorld(worldId);

    runInAction(() => {
      this.waterholeDTOS = data;
    });
  }

  async toggleWorldWaterholes(waterholesIds: string[], worldId: string): Promise<void> {
    const data = await this.crud.toggleWorldWaterholes(waterholesIds, worldId);

    runInAction(() => {
      this.waterholeDTOS = data;
    });
  }
}

export const worldWaterholesStore = new WorldWaterholesStore();
