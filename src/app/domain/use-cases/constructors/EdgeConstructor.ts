import { IEdgeConstructor } from '../../../../types/constructors/edge.constructor';
import { EdgeDTO } from '../../../../types/entities/edge';
import { ActiveWorldEdge } from '../../../../types/entities/world';
import { Edge } from '../../entities/Challenge/Edge';
import { CrossWorldEdge } from '../../entities/Cross/CrossWorldEdge/CrossWorldEdge';

export class EdgeConstructor implements IEdgeConstructor {
  async getByWorldId(worldId: string): Promise<ActiveWorldEdge> {
    const crossWorld = new CrossWorldEdge();
    const crossWorldEdge = crossWorld.list({
      query: {
        worldId,
      },
    });

    const edge = new Edge();

    edge.id = crossWorldEdge[0].edgeId;

    await edge.load();

    return {
      ...edge.serialize(),
      isSolved: crossWorld.isSolved,
    };
  }

  async toggleEdgeStatus(edgeId: string, isSolved: boolean): Promise<boolean> {
    const crossWorld = new CrossWorldEdge();

    crossWorld.edgeId = edgeId;

    await crossWorld.load();

    crossWorld.isSolved = isSolved;

    await crossWorld.save();

    return true;
  }

  async create(worldId: string, dto: EdgeDTO): Promise<string> {
    const edge = new Edge();

    edge.unSerialize(dto);
    const edgeId = await edge.save();

    const crossWorldPlot = new CrossWorldEdge();

    crossWorldPlot.worldId = worldId;
    crossWorldPlot.isSolved = false;
    crossWorldPlot.edgeId = edgeId;

    await crossWorldPlot.save();

    return edgeId;
  }

  async save(dto: ActiveWorldEdge): Promise<string> {
    const edge = new Edge();

    edge.unSerialize(dto);
    await edge.save();

    return edge.id;
  }
}
