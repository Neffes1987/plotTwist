import {Command} from '../../base/service/command';
import {ServiceType} from '../../controller/serviceMediator';

export class WorldCommands {
  static readonly getWorldsListOperation = 'getWorldsList';
  static readonly removeWorldsOperation = 'removeWorlds';

  getWorldsListIds(plotId: string): Command {
    return new Command(ServiceType.world, WorldCommands.getWorldsListOperation, {plotId});
  }

  removeWorlds(plotId: string): Command {
    return new Command(ServiceType.world, WorldCommands.removeWorldsOperation, {
      plotId,
    });
  }
}
