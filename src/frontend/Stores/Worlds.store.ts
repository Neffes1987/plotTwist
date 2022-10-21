import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IWorldController } from '../../types/controllers/controller';
import { ActivePlotWorld, WorldDTO } from '../../types/entities/world';

export class WorldsStore {
  worlds: ActivePlotWorld[] = [];
  selectedWorld = '';
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

  getSelectedLawsIds(): string[] {
    return this.worlds.find(({ worldData }) => worldData.id === this.selectedWorld)?.laws?.map(({ id }) => id) ?? [];
  }

  getSelectedWaterholesIds(): string[] {
    return this.worlds.find(({ worldData }) => worldData.id === this.selectedWorld)?.waterholes?.map(({ id }) => id) ?? [];
  }

  async list(plotId: string): Promise<void> {
    const data = await this.crud.worldList(plotId);

    runInAction(() => {
      this.worlds = data;
    });
  }

  async updateWorld(dto: WorldDTO): Promise<void> {
    await this.crud.saveWorld(dto);
    const worldIndex = this.worlds.findIndex(({ worldData }) => worldData.id === dto.id);

    if (worldIndex >= 0) {
      this.worlds[worldIndex].worldData = dto;
    }
  }

  async createWorld(dto: WorldDTO): Promise<string> {
    const worldId = await this.crud.saveWorld(dto);

    this.worlds.push({ worldData: { ...dto, id: worldId }, laws: [], waterholes: [] });

    return worldId;
  }

  async toggleWorldLaw(law: LawDTO): Promise<void> {
    const world = this.worlds.find(({ worldData }) => worldData.id === this.selectedWorld);

    if (!world) {
      return;
    }

    const assignedLawIndex = world.laws.findIndex(({ id }) => id === law.id);

    await this.crud.toggleLawInWorld(law.id, this.selectedWorld);

    runInAction(() => {
      if (assignedLawIndex < 0) {
        world.laws.push({ ...law, isBroken: false });
      } else {
        world.laws.splice(assignedLawIndex, 1);
      }
    });
  }

  async toggleWorldWaterhole(waterhole: WaterholeDTO): Promise<void> {
    const world = this.worlds.find(({ worldData }) => worldData.id === this.selectedWorld);

    if (!world) {
      return;
    }

    const assignedLawIndex = world.waterholes.findIndex(({ id }) => id === waterhole.id);

    await this.crud.toggleWaterholeInWorld(waterhole.id, this.selectedWorld);

    runInAction(() => {
      if (assignedLawIndex < 0) {
        world.waterholes.push({ ...waterhole });
      } else {
        world.waterholes.splice(assignedLawIndex, 1);
      }
    });
  }

  async toggleLawStatus(worldId: string, lawId: string): Promise<void> {
    const world = this.worlds.find(({ worldData }) => worldData.id === worldId);

    if (!world) {
      return;
    }

    const assignedLaw = world.laws.find(({ id }) => id === lawId);

    if (!assignedLaw) {
      return;
    }

    const newIsBroken = !assignedLaw.isBroken;

    await this.crud.toggleLawStatus(assignedLaw.id, newIsBroken);

    runInAction(() => {
      assignedLaw.isBroken = newIsBroken;
    });
  }
}

export const worldsStore = new WorldsStore();
