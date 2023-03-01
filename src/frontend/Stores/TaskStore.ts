import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { ITaskController } from '../../types/controllers/controller';
import { TaskDTO } from '../../types/entities/task';

export class TaskStore {
  task: Nullable<TaskDTO>;
  tasks: TaskDTO[] = [];
  private readonly crud: ITaskController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async get(id: string): Promise<void> {
    this.task = await this.crud.getTask(id);
  }

  async delete(id: string): Promise<void> {
    await this.crud.removeTask(id);

    this.task = null;

    await this.list();
  }

  async list(): Promise<void> {
    this.tasks = await this.crud.getTasks({});
  }

  async save(dto: TaskDTO): Promise<string> {
    const id = await this.crud.saveTask(dto);

    runInAction(() => {
      this.task = { ...dto, id };
    });

    await this.list();

    return id;
  }
}

export const taskStore = new TaskStore();
