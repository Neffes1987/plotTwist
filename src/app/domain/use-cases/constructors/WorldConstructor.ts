import { WorldEnum } from '../../../../constants/world.enum';
import { IWorldConstructor } from '../../../../types/constructors/world.constructor';
import { WorldDTO } from '../../../../types/entities/world';
import { CrossWorldPlot } from '../../entities/Cross/CrossWorldPlot/CrossWorldPlot';
import { createWorld } from '../../entities/World/WorldFactory/createWorld';

export class WorldConstructor implements IWorldConstructor {
  async create(plotId: string, dto: WorldDTO): Promise<string> {
    const world = createWorld(dto.type);

    world.unSerialize(dto);
    await world.save();

    const crossWorldPlot = new CrossWorldPlot();

    crossWorldPlot.worldId = world.id;
    crossWorldPlot.plotId = plotId;

    await crossWorldPlot.save();

    return world.id;
  }

  async list(plotId: string): Promise<WorldDTO[]> {
    const crossWorlds = new CrossWorldPlot();

    const plotWorlds = await crossWorlds.getWorldListByPlotId(plotId);
    const worlds = plotWorlds.map(async ({ worldId, type, status }) => {
      const world = createWorld(type);

      world.id = worldId;

      await world.load();
      world.status = status;

      return world.serialize();
    });

    return Promise.all(worlds);
  }

  async save(dto: WorldDTO): Promise<string> {
    const world = createWorld(dto.type);

    world.unSerialize(dto);
    await world.save();

    return world.id;
  }

  async get(id: string, type: WorldEnum): Promise<WorldDTO> {
    const world = createWorld(type);

    world.id = id;

    await world.load();

    return world.serialize();
  }
}
