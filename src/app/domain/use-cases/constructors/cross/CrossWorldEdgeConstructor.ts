import { ActiveRecord } from 'src/app/domain/entities/ActiveRecord/ActiveRecord';

import { ITaskConstructor } from '../../../../../types/constructors/task.constructor';
import { IWorldTaskConstructor } from '../../../../../types/constructors/world.constructor';
import { CrossWorldEdgeDTO } from '../../../../../types/entities/cross';
import { TaskInWorldDTO } from '../../../../../types/entities/task';
import { CrossWorldEdge } from '../../../entities/Cross/CrossWorldEdge/CrossWorldEdge';

import { CommonCrossConstructor } from './CommonCrossConstructor';

export class CrossWorldEdgeConstructor extends CommonCrossConstructor<CrossWorldEdgeDTO> implements IWorldTaskConstructor {
  private readonly taskConstructor: ITaskConstructor;

  constructor(taskConstructor: ITaskConstructor) {
    super();
    this.taskConstructor = taskConstructor;
  }

  async assignedList(worldId: string): Promise<TaskInWorldDTO[]> {
    const model = this.getModel();

    const crossWorldEdgeDTOS = await model.list({
      query: {
        worldId,
      },
    });

    if (!crossWorldEdgeDTOS?.length) {
      return [];
    }

    const [edge] = await this.taskConstructor.list({ query: { id: crossWorldEdgeDTOS[0]?.edgeId } });

    if (!edge) {
      return [];
    }

    return [
      {
        ...edge,
        isSolved: crossWorldEdgeDTOS[0].isSolved,
      },
    ];
  }

  async toggle(edgeIds: string[], worldId: string): Promise<TaskInWorldDTO[]> {
    const crossWorldEdges = this.getModel();

    const availableEdges = await crossWorldEdges.list({
      query: {
        worldId,
      },
    });

    await this.upsertBunch(worldId, availableEdges, edgeIds, 'edgeId');

    return this.assignedList(worldId);
  }

  getModelDTO(parentID: string): CrossWorldEdgeDTO {
    return {
      worldId: parentID,
      edgeId: '',
      id: '',
      isSolved: false,
    };
  }

  getModel(): ActiveRecord<CrossWorldEdgeDTO> {
    return new CrossWorldEdge();
  }
}
