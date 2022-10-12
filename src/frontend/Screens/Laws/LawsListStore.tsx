import { ILawsController, LawDTO, lawsController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

export class LawsListStore {
  laws: LawDTO[] = [];
  private readonly crud: ILawsController;

  constructor() {
    makeAutoObservable(this);
    this.crud = lawsController;
  }

  async list(): Promise<void> {
    const data = await this.crud.list({
      pagination: {
        count: 25,
        page: 1,
      },
    });

    runInAction(() => {
      this.laws = data;
    });
  }

  async toggleWorldLaw(worldId: string, lawId: string): Promise<void> {
    const law = this.laws.find(({ id }) => id === lawId);

    if (!law) {
      return;
    }

    const lawWorldIndex = law?.worldIds.findIndex(id => worldId === id);

    if (lawWorldIndex < 0) {
      await this.crud.addLawsToWorld([lawId], worldId);
      law.worldIds.push(worldId);
    } else {
      law.worldIds.splice(lawWorldIndex, 1);
      await this.crud.removeLawsFromWorld([lawId]);
    }
  }

  async toggleLawStatus(lawId: string): Promise<void> {
    const law = this.laws.find(({ id }) => id === lawId);

    if (!law) {
      return;
    }

    law.isBroken = !law.isBroken;

    await this.crud.changeLawStatus(law.id, law.isBroken);
  }

  async update(law: LawDTO): Promise<void> {
    await this.crud.update({ ...law, isBroken: law.isBroken ?? false });
    await this.list();
  }

  async delete(id: string): Promise<void> {
    await this.crud.delete(id);
    await this.list();
  }

  async create(name: string, description: string, punishment: string): Promise<string> {
    const plotId = await this.crud.create({ name, description, punishment, isBroken: false, worldIds: [] });

    if (plotId) {
      await this.list();

      return plotId;
    }

    return '';
  }
}

export const lawsListStore = new LawsListStore();
