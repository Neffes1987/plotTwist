import {Command} from '../../base/service/command';
import {ServiceType} from '../../controller/serviceMediator';

export class PlotCommands {
  static readonly updatePlotStatusOperationName = 'updatePlotStatus';

  updatePlotStatus(plotId: string, isActive: boolean): Command {
    return new Command(ServiceType.plot, PlotCommands.updatePlotStatusOperationName, {
      plotId: plotId,
      isActive: isActive,
    });
  }
}
