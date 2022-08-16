import { IPlotController, plotController, PlotDTO } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

export class PlotListStore {
  plots: PlotDTO[] = [];
  error: Nullable<Error> = null;
  private readonly crud: IPlotController;

  constructor() {
    makeAutoObservable(this);
    this.crud = plotController;
  }

  resetError(): void {
    runInAction(() => {
      this.error = null;
    });
  }

  async list(): Promise<void> {
    this.resetError();

    try {
      const data = await this.crud.list({
        pagination: {
          count: 25,
          page: 1,
        },
      });

      runInAction(() => {
        this.plots = data;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    }
  }

  async updatePlot({ id = '', name = '', description = '', status = 'draft' }: Partial<PlotDTO>): Promise<void> {
    this.resetError();

    try {
      await this.crud.update({ id, name, description, status });
      await this.list();
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    }
  }

  async deletePlot(id: string): Promise<void> {
    this.resetError();

    try {
      await this.crud.delete(id);
      await this.list();
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    }
  }

  async createPlot(name: string, description: string): Promise<string> {
    this.resetError();

    try {
      const plotId = await this.crud.create({ name, description, status: 'draft' });

      if (plotId) {
        await this.list();

        return plotId;
      }

      return '';
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });

      return '';
    }
  }
}

export const plotListStore = new PlotListStore();
