import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IWorldController } from '../../../../types/controllers/controller';
import { ActivePlotWorld, WorldDTO } from '../../../../types/entities/world';

export class WorldsStore {
  worlds: ActivePlotWorld[] = [];
  selectedWorld = '';
  selectedWorldDto: Nullable<WorldDTO> = null;
  private readonly crud: IWorldController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  setWorldId(worldId: string): void {
    runInAction(() => {
      this.selectedWorld = worldId;
    });
  }

  async list(plotId: string): Promise<void> {
    const data = await this.crud.worldList(plotId);

    runInAction(() => {
      this.worlds = data;
    });
  }

  async getWorld(id: string): Promise<void> {
    this.selectedWorldDto = await this.crud.getWorld(id);
  }

  async updateWorld(dto: WorldDTO): Promise<string> {
    await this.crud.saveWorld(dto);
    const worldIndex = this.worlds.findIndex(({ worldData }) => worldData.id === dto.id);

    if (worldIndex >= 0) {
      this.worlds[worldIndex].worldData = dto;
    }

    return dto.id;
  }

  async createWorld(plotId: string, dto: WorldDTO): Promise<string> {
    const worldId = await this.crud.createWorld(plotId, dto);

    this.worlds.push({ worldData: { ...dto, id: worldId }, waterholes: [], edge: null });

    return worldId;
  }
}

export const worldsStore = new WorldsStore();
