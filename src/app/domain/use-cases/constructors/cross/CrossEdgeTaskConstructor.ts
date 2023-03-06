import { ActiveRecord } from 'src/app/domain/entities/ActiveRecord/ActiveRecord';

import { ITaskConstructor } from '../../../../../types/constructors/task.constructor';
import { IEdgeTaskConstructor } from '../../../../../types/constructors/world.constructor';
import { CrossEdgeTaskRewardDTO } from '../../../../../types/entities/cross';
import { TaskInWorldDTO } from '../../../../../types/entities/task';
import { CrossEdgeTask } from '../../../entities/Cross/CrossEdgeTask/CrossEdgeTask';

import { CommonCrossConstructor } from './CommonCrossConstructor';

export class CrossEdgeTaskConstructor extends CommonCrossConstructor<CrossEdgeTaskRewardDTO> implements IEdgeTaskConstructor {
  private readonly taskConstructor: ITaskConstructor;

  constructor(taskConstructor: ITaskConstructor) {
    super();
    this.taskConstructor = taskConstructor;
  }

  async toggleRewardInTask(rewardId: string, taskId: string): Promise<boolean> {
    const model = this.getModel() as CrossEdgeTask;
    const crossDTOS = await model.list({
      query: {
        taskId,
      },
    });
    const existedTask = crossDTOS[0];

    if (existedTask) {
      model.unSerialize(existedTask);
      model.rewardId = rewardId;

      await model.save();
    }

    return true;
  }

  async assignedList(edgeId: string): Promise<TaskInWorldDTO[]> {
    const model = this.getModel();

    const crossDTOS = await model.list({
      query: {
        edgeId,
      },
    });

    if (!crossDTOS?.length) {
      return [];
    }

    const existedCrossDtos: Record<
      string,
      {
        isAchieved: boolean;
        rewardId: string;
      }
    > = {};

    crossDTOS.forEach(({ taskId, isAchieved, rewardId }) => {
      existedCrossDtos[taskId] = {
        isAchieved,
        rewardId,
      };
    });

    const list = await this.taskConstructor.list({ query: { id: Object.keys(existedCrossDtos) } });

    if (!list) {
      return [];
    }

    return list.map(model => ({
      ...model,
      isSolved: existedCrossDtos[model.id]?.isAchieved,
      rewardId: existedCrossDtos[model.id]?.rewardId,
    }));
  }

  async toggle(tasksIds: string[], edgeId: string): Promise<TaskInWorldDTO[]> {
    const crossDTOS = this.getModel();

    const availableEdges = await crossDTOS.list({
      query: {
        edgeId,
      },
    });

    await this.upsertBunch(edgeId, availableEdges, tasksIds, 'taskId');

    return this.assignedList(edgeId);
  }

  getModelDTO(parentID: string): CrossEdgeTaskRewardDTO {
    return {
      taskId: '',
      edgeId: parentID,
      rewardId: '',
      id: '',
      isAchieved: false,
    };
  }

  getModel(): ActiveRecord<CrossEdgeTaskRewardDTO> {
    return new CrossEdgeTask();
  }
}
