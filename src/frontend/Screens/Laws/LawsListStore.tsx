import { IPlotController, LawDTO, plotController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

export class ListStore {
  laws: LawDTO[] = [];
  private readonly crud: IPlotController;

  constructor() {
    makeAutoObservable(this);
    this.crud = plotController;
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

  async update({ id = '', name = '', description = '', status = 'draft' }: Partial<LawDTO>): Promise<void> {
    await this.crud.update({ id, name, description, status });
    await this.list();
  }

  async delete(id: string): Promise<void> {
    await this.crud.delete(id);
    await this.list();
  }

  async create(name: string, description: string): Promise<string> {
    const plotId = await this.crud.create({ name, description, status: 'draft' });

    if (plotId) {
      await this.list();

      return plotId;
    }

    return '';
  }
}

export const lawsListStore = new ListStore();
