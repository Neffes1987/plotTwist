import {AbstractService} from '../../base/service/abstractService';
import {Command} from '../../base/service/command';
import {ServiceMediator} from '../../controller/serviceMediator';

import {IPlotModel, PlotModel} from './plot/plotModel';
import {PlotRepository} from './plot/plotRepository';
import {PlotCommands} from './plotCommands';

export class PlotService extends AbstractService {
  private readonly _plotRepository;
  private readonly _commands;

  constructor(mediator: ServiceMediator) {
    super(mediator);

    this._plotRepository = new PlotRepository();
    this._commands = new PlotCommands();
  }

  get commands(): PlotCommands {
    return this._commands;
  }

  async getPlotsList(page: number, limit: number): Promise<PlotModel[]> {
    return this._plotRepository.list(page, limit);
  }

  async getPlot(plotId: string): Promise<PlotModel> {
    const plot = await this._plotRepository.get(plotId);

    if (plot == null) {
      throw this.errorLog.formatWrongFieldsError({plotId});
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

  async changePlotStatus(plotId: string, isActive: boolean): Promise<boolean> {
    const plot = await this.getPlot(plotId);

    if (!plot) {
      throw this.errorLog.formatWrongFieldsError({wrongId: plotId});
    }

    plot.setIsActive(isActive);

    await this._plotRepository.replace(plot);

    return true;
  }

  async executeCommand(command: Command): Promise<unknown> {
    switch (command.operationName) {
      case PlotCommands.updatePlotStatusOperationName:
        return this.changePlotStatus(command.payload.plotId as string, command.payload.isActive as boolean);
      default:
        return null;
    }
  }
}
