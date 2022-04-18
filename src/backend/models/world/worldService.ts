import {AbstractService} from '../../base/service/abstractService';
import {Command} from '../../base/service/command';
import {ServiceMediator} from '../../controller/serviceMediator';

import {ILawModel, LawModel} from './law/lawModel';
import {LawRepository} from './law/lawRepository';
import {ICommonWorld, WorldModel, WorldStatus} from './world/worldModel';
import {WorldRepository} from './world/worldRepository';
import {WorldCommands} from './worldCommands';

export class WorldService extends AbstractService {
  _worldRepository = new WorldRepository();
  _lawRepository = new LawRepository();
  _commands = new WorldCommands();

  constructor(mediator: ServiceMediator) {
    super(mediator);
  }

  get commands(): WorldCommands {
    return this._commands;
  }

  async getWorldsList(plotId: string): Promise<WorldModel[]> {
    return this._worldRepository.list(plotId);
  }

  async removeWorlds(plotId: string): Promise<boolean> {
    return this._worldRepository.removeAllByPlotId(plotId);
  }

  async getWorld(worldId: string): Promise<Nullable<WorldModel>> {
    return this._worldRepository.get(worldId);
  }

  async createWorld(worldData: ICommonWorld): Promise<string> {
    return this._worldRepository.add(this._worldRepository.generateModel(worldData));
  }

  async updateWorld(worldData: ICommonWorld): Promise<boolean> {
    return this._worldRepository.replace(this._worldRepository.generateModel(worldData));
  }

  async activateWorld(worldId: string, status: WorldStatus): Promise<boolean> {
    const changedWorld = await this.getWorld(worldId);

    if (changedWorld == null) {
      throw this.errorLog.formatWrongFieldsError({wrongWorldId: worldId});
    }

    changedWorld.setStatus(status);
    await this._worldRepository.replace(changedWorld);

    const plotWorlds = await this.getWorldsList(changedWorld.plotId);
    let isPlotActive = true;

    if (plotWorlds.length === 5) {
      for (const world of plotWorlds) {
        if (world.status === 'draft') {
          isPlotActive = false;

          break;
        }
      }
    } else {
      isPlotActive = false;
    }

    await this.sendMediatorCommand(this.mediator.plotService.commands.updatePlotStatus(changedWorld.plotId, isPlotActive));

    return true;
  }

  // laws

  async getLawsList(worldId: string): Promise<LawModel[]> {
    return this._lawRepository.list(worldId);
  }

  async getLaw(lawId: string): Promise<Nullable<LawModel>> {
    return this._lawRepository.get(lawId);
  }

  async createLaw(lawData: ILawModel): Promise<string> {
    return this._lawRepository.add(this._lawRepository.generateModel(lawData));
  }

  async updateLaw(lawData: ILawModel): Promise<boolean> {
    return this._lawRepository.replace(this._lawRepository.generateModel(lawData));
  }

  async removeLaw(lawId: string): Promise<boolean> {
    const law = await this.getLaw(lawId);

    if (law == null) {
      return false;
    }

    const list = await this.getLawsList(law.worldId);

    if (list.length - 1 < WorldModel.LAWS_MIN_LENGT) {
      throw this.errorLog.formatWrongFieldsError({
        lawId: 'not_enough_laws_in_world',
      });
    }

    return this._lawRepository.remove(lawId);
  }

  async executeCommand(command: Command): Promise<unknown> {
    switch (command.operationName) {
      case WorldCommands.getWorldsListOperation:
        return this.getWorldsList(command.payload.plotId as string);
      case WorldCommands.removeWorldsOperation:
        return this.removeWorlds(command.payload.plotId as string);
      default:
        return null;
    }
  }
}
