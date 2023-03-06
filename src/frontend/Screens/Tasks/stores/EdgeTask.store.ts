import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IEdgeTaskController } from '../../../../types/controllers/controller';
import { TaskInWorldDTO } from '../../../../types/entities/task';

export class EdgeTaskStore {
  tasks: TaskInWorldDTO[] = [];
  private readonly crud: IEdgeTaskController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(worldId: string): Promise<void> {
    const data = await this.crud.getTasksInEdge(worldId);

    runInAction(() => {
      this.tasks = data;
    });
  }

  async toggleEdgeTasks(taskIds: string[], parentId?: string): Promise<void> {
    if (!parentId) {
      return;
    }

    const data = await this.crud.toggleEdgeTasks(taskIds, parentId);

    runInAction(() => {
      this.tasks = data;
    });
  }

  async toggleTaskReward(taskIds: string[], worldId: string): Promise<void> {
    const data = await this.crud.toggleEdgeTasks(taskIds, worldId);

    runInAction(() => {
      this.tasks = data;
    });
  }
}

export const edgeTasksStore = new EdgeTaskStore();
