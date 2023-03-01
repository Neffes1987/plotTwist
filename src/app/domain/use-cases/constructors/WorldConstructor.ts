import { ILawConstructor } from '../../../../types/constructors/law.constructor';
import { IWaterholeConstructor } from '../../../../types/constructors/waterhole.constructor';
import { IWorldConstructor } from '../../../../types/constructors/world.constructor';
import { ActivePlotWorld, WorldDTO } from '../../../../types/entities/world';
import { CrossWorldLaw } from '../../entities/Cross/CrossWorldLaw/CrossWorldLaw';
import { CrossWorldPlot } from '../../entities/Cross/CrossWorldPlot/CrossWorldPlot';
import { CrossWorldWaterhole } from '../../entities/Cross/CrossWorldWaterhole/CrossWorldWaterhole';
import { World } from '../../entities/World/World';

export class WorldConstructor implements IWorldConstructor {
  private readonly lawConstructor: ILawConstructor;
  private readonly waterholeConstructor: IWaterholeConstructor;

  constructor(lawConstructor: ILawConstructor, waterholeConstructor: IWaterholeConstructor) {
    this.lawConstructor = lawConstructor;
    this.waterholeConstructor = waterholeConstructor;
  }

  async create(plotId: string, dto: WorldDTO): Promise<string> {
    const world = new World();

    world.unSerialize(dto);
    const worldId = await world.save();

    const crossWorldPlot = new CrossWorldPlot();

    crossWorldPlot.worldId = worldId;
    crossWorldPlot.type = world.type;
    crossWorldPlot.plotId = plotId;

    await crossWorldPlot.save();

    return world.id;
  }

  async list(plotId: string): Promise<ActivePlotWorld[]> {
    const crossWorlds = new CrossWorldPlot();

    const plotWorlds = await crossWorlds.getWorldListByPlotId(plotId);

    const worlds = plotWorlds.map(async ({ worldId, status }) => {
      const world = new World();

      world.id = worldId;

      await world.load();
      world.status = status;

      const laws = await this.lawConstructor.getWorldLaws(world.id);
      const waterholes = await this.waterholeConstructor.getWorldWaterholes(world.id);

      return {
        worldData: world.serialize(),
        laws,
        waterholes,
        edge: null,
        characters: [],
      };
    });

    return Promise.all(worlds);
  }

  async save(dto: WorldDTO): Promise<string> {
    const world = new World();

    world.unSerialize(dto);
    world.id = await world.save();

    return world.id;
  }

  async get(id: string): Promise<WorldDTO> {
    const world = new World();

    world.id = id;

    await world.load();

    return world.serialize();
  }

  async toggleWorldLawRelation(lawId: string, worldId: string): Promise<boolean> {
    const crossWorldLaw = new CrossWorldLaw();

    await crossWorldLaw.loadByLawId(lawId);

    if (crossWorldLaw.worldId) {
      await crossWorldLaw.remove();
    } else {
      crossWorldLaw.worldId = worldId;
      crossWorldLaw.lawId = lawId;
      crossWorldLaw.isBroken = false;

      await crossWorldLaw.save();
    }

    return true;
  }

  async toggleWorldWaterholeRelation(waterholeId: string, worldId: string): Promise<boolean> {
    const crossWorldWaterhole = new CrossWorldWaterhole();

    await crossWorldWaterhole.loadByWaterholeId(waterholeId);

    if (crossWorldWaterhole.worldId) {
      await crossWorldWaterhole.remove();
    } else {
      crossWorldWaterhole.worldId = worldId;
      crossWorldWaterhole.waterholeId = waterholeId;

      await crossWorldWaterhole.save();
    }

    return true;
  }

  async toggleWorldLawStatus(lawId: string, isBroken: boolean): Promise<boolean> {
    const crossWorldLaw = new CrossWorldLaw();

    await crossWorldLaw.loadByLawId(lawId);
    crossWorldLaw.isBroken = isBroken;

    await crossWorldLaw.save();

    return true;
  }
}
