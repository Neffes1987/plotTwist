import { AbstractService } from '../../base/service/abstractService';
import { ServiceMediator } from '../../controller/serviceMediator';
import { PlotStatus } from '../plot/plot/plotModel';

import { ILawModel, LawModel } from './law/lawModel';
import { LawRepository } from './law/lawRepository';
import { ICommonWorld, WorldModel, WorldStatus } from './world/worldModel';
import { IWorldListQuery, WorldRepository } from './world/worldRepository';

export class WorldService extends AbstractService {
  _worldRepository: WorldRepository;
  _lawRepository: LawRepository;

  constructor(mediator: ServiceMediator) {
    super(mediator);

    this._worldRepository = new WorldRepository();
    this._lawRepository = new LawRepository();
  }

  async getWorldsList(props: IWorldListQuery): Promise<WorldModel[]> {
    return this._worldRepository.list(props);
  }

  async removeWorlds(plotId: string): Promise<boolean> {
    return this._worldRepository.removeAllByPlotId(plotId);
  }

  async getWorld(worldId: string): Promise<Nullable<WorldModel>> {
    return this._worldRepository.get(worldId);
  }

  async createWorld(worldData: ICommonWorld): Promise<string> {
    const world = this._worldRepository.generateModel(worldData);

    this._worldRepository.generateModelId(world);

    return this._worldRepository.add(world);
  }

  async updateWorld(worldData: ICommonWorld): Promise<boolean> {
    return this._worldRepository.replace(this._worldRepository.generateModel(worldData));
  }

  async activateWorld(worldId: string, status: WorldStatus): Promise<boolean> {
    const changedWorld = await this.getWorld(worldId);

    if (changedWorld == null) {
      throw this.errorLog.formatWrongFieldsError({ wrongWorldId: worldId });
    }

    changedWorld.setStatus(status);
    await this._worldRepository.replace(changedWorld);

    const plotWorlds = await this.getWorldsList({ plotId: changedWorld.plotId });
    let plotStatus: PlotStatus;
    const worldStatuses = {
      draft: 0,
      release: 0,
      finished: 0,
    };

    if (plotWorlds.length === 5) {
      for (const world of plotWorlds) {
        worldStatuses[world.status] += 1;
      }

      if (worldStatuses.draft > 0) {
        plotStatus = 'draft';
      } else if (worldStatuses.finished === 5) {
        plotStatus = 'finished';
      } else {
        plotStatus = 'released';
      }
    } else {
      plotStatus = 'draft';
    }

    return this.mediator.plotService.changePlotStatus(changedWorld.plotId, plotStatus);
  }

  // laws
  async getLawsList(worldId: string): Promise<LawModel[]> {
    return this._lawRepository.list(worldId);
  }

  async getLaw(lawId: string): Promise<Nullable<LawModel>> {
    return this._lawRepository.get(lawId);
  }

  async createLaw(lawData: ILawModel): Promise<string> {
    const model = this._lawRepository.generateModel(lawData);

    this._lawRepository.generateModelId(model);

    return this._lawRepository.add(model);
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

    if (list.length - 1 < 2) {
      throw this.errorLog.formatWrongFieldsError({
        lawId: 'not_enough_laws_in_world',
      });
    }

    return this._lawRepository.remove(lawId);
  }
}
