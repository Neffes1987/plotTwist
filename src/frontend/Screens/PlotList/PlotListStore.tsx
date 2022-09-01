import { IPlotController, plotController, PlotDTO } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

export class PlotListStore {
  plots: PlotDTO[] = [];
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
      this.plots = data;
    });
  }

  async updatePlot({ id = '', name = '', description = '', status = 'draft' }: Partial<PlotDTO>): Promise<void> {
    await this.crud.update({ id, name, description, status });
    await this.list();
  }

  async deletePlot(id: string): Promise<void> {
    await this.crud.delete(id);
    await this.list();
  }

  async createPlot(name: string, description: string): Promise<string> {
    const plotId = await this.crud.create({ name, description, status: 'draft' });

    if (plotId) {
      await this.list();

      return plotId;
    }

    return '';
  }
}

export const plotListStore = new PlotListStore();
