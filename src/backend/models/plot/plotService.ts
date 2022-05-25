import { IPlotModel, PlotStatus } from '@backend';

import { AbstractService } from '../../base/service/abstractService';
import { ServiceMediator } from '../../controller/serviceMediator';

import { PlotModel } from './plot/plotModel';
import { PlotRepository } from './plot/plotRepository';

export class PlotService extends AbstractService {
  private readonly _plotRepository;

  constructor(mediator: ServiceMediator) {
    super(mediator);

    this._plotRepository = new PlotRepository();
  }

  async getPlotsList(page: number, limit: number): Promise<PlotModel[]> {
    return this._plotRepository.list(page, limit);
  }

  async getPlot(plotId: string): Promise<PlotModel> {
    const plot = await this._plotRepository.get(plotId);

    if (plot == null) {
      throw this.errorLog.formatWrongFieldsError({ plotId });
    }

    return plot;
  }

  async createPlot(modelData: IPlotModel): Promise<string> {
    return this._plotRepository.add(this._plotRepository.generateModel(modelData));
  }

  async updatePlot(modelData: IPlotModel): Promise<boolean> {
    return this._plotRepository.replace(this._plotRepository.generateModel(modelData));
  }

  async removePlot(plotId: string): Promise<boolean> {
    return this._plotRepository.remove(plotId);
  }

  async changePlotStatus(plotId: string, status: PlotStatus): Promise<boolean> {
    const plot = await this.getPlot(plotId);

    if (!plot) {
      throw this.errorLog.formatWrongFieldsError({ wrongId: plotId });
    }

    plot.setStatus(status);

    await this._plotRepository.replace(plot);

    return true;
  }
}
