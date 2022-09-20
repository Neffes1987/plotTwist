import { ILawsController, LawDTO, lawsController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

export class ListStore {
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

  async update(law: LawDTO): Promise<void> {
    await this.crud.update({ ...law, isBroken: law.isBroken ?? false });
    await this.list();
  }

  async delete(id: string): Promise<void> {
    await this.crud.delete(id);
    await this.list();
  }

  async create(name: string, description: string, punishment: string): Promise<string> {
    const plotId = await this.crud.create({ name, description, punishment, isBroken: false });

    if (plotId) {
      await this.list();

      return plotId;
    }

    return '';
  }
}

export const lawsListStore = new ListStore();
