import { IWaterholeConstructor } from '../../../../types/constructors/waterhole.constructor';
import { IWorldConstructor } from '../../../../types/constructors/world.constructor';
import { ActivePlotWorld, WorldDTO } from '../../../../types/entities/world';
import { CrossWorldPlot } from '../../entities/Cross/CrossWorldPlot/CrossWorldPlot';
import { World } from '../../entities/World/World';

export class WorldConstructor implements IWorldConstructor {
  private readonly waterholeConstructor: IWaterholeConstructor;

  constructor(waterholeConstructor: IWaterholeConstructor) {
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

      const waterholes = await this.waterholeConstructor.getWorldWaterholes(world.id);

      return {
        worldData: world.serialize(),
        laws: [],
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
}
