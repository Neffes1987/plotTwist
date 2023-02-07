import { WorldEnum } from '../../../../constants/world.enum';
import { IEdgeConstructor } from '../../../../types/constructors/edge.constructor';
import { ILawConstructor } from '../../../../types/constructors/law.constructor';
import { IWaterholeConstructor } from '../../../../types/constructors/waterhole.constructor';
import { IWorldConstructor } from '../../../../types/constructors/world.constructor';
import { ActivePlotWorld, WorldDTO } from '../../../../types/entities/world';
import { CrossWorldLaw } from '../../entities/Cross/CrossWorldLaw/CrossWorldLaw';
import { CrossWorldPlot } from '../../entities/Cross/CrossWorldPlot/CrossWorldPlot';
import { CrossWorldWaterhole } from '../../entities/Cross/CrossWorldWaterhole/CrossWorldWaterhole';
import { createWorld } from '../../entities/World/WorldFactory/createWorld';

export class WorldConstructor implements IWorldConstructor {
  private readonly lawConstructor: ILawConstructor;
  private readonly waterholeConstructor: IWaterholeConstructor;
  private readonly edgeConstructor: IEdgeConstructor;

  constructor(lawConstructor: ILawConstructor, waterholeConstructor: IWaterholeConstructor, edgeConstructor: IEdgeConstructor) {
    this.lawConstructor = lawConstructor;
    this.waterholeConstructor = waterholeConstructor;
    this.edgeConstructor = edgeConstructor;
  }

  async create(plotId: string, dto: WorldDTO): Promise<string> {
    const world = createWorld(dto.type);

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

    const worlds = plotWorlds.map(async ({ worldId, type, status }) => {
      const world = createWorld(type);

      world.id = worldId;

      await world.load();
      world.status = status;

      const laws = await this.lawConstructor.getWorldLaws(world.id);
      const waterholes = await this.waterholeConstructor.getWorldWaterholes(world.id);
      const edge = await this.edgeConstructor.getByWorldId(worldId);

      return {
        worldData: world.serialize(),
        laws,
        waterholes,
        edge,
        characters: [],
      };
    });

    return Promise.all(worlds);
  }

  async save(dto: WorldDTO): Promise<string> {
    const world = createWorld(dto.type);

    world.unSerialize(dto);
    world.id = await world.save();

    return world.id;
  }

  async get(id: string, type: WorldEnum): Promise<WorldDTO> {
    const world = createWorld(type);

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
