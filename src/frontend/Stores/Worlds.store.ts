import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IWorldController } from '../../types/controllers/controller';
import { WorldDTO } from '../../types/entities/world';

export class WorldsStore {
  worlds: WorldDTO[] = [];
  private readonly crud: IWorldController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(plotId: string): Promise<void> {
    const data = await this.crud.worldList(plotId);

    runInAction(() => {
      this.worlds = data;
    });
  }

  async updateWorld(dto: WorldDTO): Promise<void> {
    await this.crud.saveWorld(dto);
    this.worlds.push(dto);
  }

  async createWorld(dto: WorldDTO): Promise<string> {
    const worldId = await this.crud.saveWorld(dto);

    this.worlds.push({ ...dto, id: worldId });

    return worldId;
  }
}

export const worldsStore = new WorldsStore();
