import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IWorldLawsController } from '../../../../types/controllers/controller';

export class WorldLawsStore {
  laws: LawInWorldDTO[] = [];
  private readonly crud: IWorldLawsController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(worldId: string): Promise<void> {
    const data = await this.crud.getLawsInWorld(worldId);

    runInAction(() => {
      this.laws = data;
    });
  }

  async toggleWorldLaws(lawIds: string[], worldId: string): Promise<void> {
    const data = await this.crud.toggleWorldLaws(lawIds, worldId);

    runInAction(() => {
      this.laws = data;
    });
  }

  async toggleLawStatus(lawId: string): Promise<void> {
    const assignedLaw = this.laws.find(({ id }) => id === lawId);

    if (!assignedLaw) {
      return;
    }

    const newIsBroken = !assignedLaw.isBroken;

    await this.crud.toggleWorldLawsStatus(assignedLaw.id, newIsBroken);

    runInAction(() => {
      assignedLaw.isBroken = newIsBroken;
    });
  }
}

export const worldLawsStore = new WorldLawsStore();
