import { IListQuery } from '../base/interface';
import { IPlotModel } from '../models/plot/plot/interface';
import { PlotModel } from '../models/plot/plot/plotModel';

import { PlotInfoResponse } from './interface';
import { ServiceMediator } from './serviceMediator';

class PlotController {
  static readonly PAGE = 1;
  static readonly LIMIT = 20;
  readonly _mediator = new ServiceMediator();

  get mediator(): ServiceMediator {
    return this._mediator;
  }

  async getPlotsList(data: IListQuery): Promise<IPlotModel[]> {
    const models = await this.mediator.plotService.getPlotsList(data.page ?? PlotController.PAGE, data.limit ?? PlotController.LIMIT);

    return models.map((model: PlotModel) => model.serialize() as IPlotModel);
  }

  async getPlot(plotId: string): Promise<PlotInfoResponse> {
    return this.mediator.getPlotInfo(plotId);
  }
}

export const plotController = new PlotController();
