import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { StatusEnum } from '../../../../constants/status.enum';
import { IPlotController } from '../../../../types/controllers/controller';
import { PlotDTO } from '../../../../types/entities/plot';

export class PlotsStore {
  plots: PlotDTO[] = [];
  private readonly crud: IPlotController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(): Promise<void> {
    const data = await this.crud.plotList({});

    runInAction(() => {
      this.plots = data;
    });
  }

  async getPlot(plotId: string): Promise<Nullable<PlotDTO>> {
    return this.crud.getPlot(plotId);
  }

  async updatePlot({ id = '', name = '', status = StatusEnum.Draft }: Partial<PlotDTO>): Promise<void> {
    await this.crud.savePlot({ id, name, status });
    await this.list();
  }

  async deletePlot(id: string): Promise<void> {
    await this.crud.deletePlot(id);
    await this.list();
  }

  async createPlot(name: string): Promise<string> {
    const plotId = await this.crud.savePlot({ id: '', name, status: StatusEnum.Draft });

    runInAction(() => {
      this.plots.push({ id: plotId, name, status: StatusEnum.Draft });
    });

    return plotId;
  }
}

export const plotsStore = new PlotsStore();
