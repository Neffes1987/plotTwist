import { ITaskConstructor } from '../../../../types/constructors/task.constructor';
import { TaskDTO } from '../../../../types/entities/task';
import { ActiveWorldEdge } from '../../../../types/entities/world';
import { Task } from '../../entities/Task/Task';

export class TaskConstructor implements ITaskConstructor {
  async create(dto: TaskDTO): Promise<string> {
    const task = new Task();

    task.unSerialize(dto);

    return task.save();
  }

  async save(dto: ActiveWorldEdge): Promise<string> {
    const task = new Task();

    task.unSerialize(dto);

    return task.save();
  }

  async delete(id: string): Promise<boolean> {
    const task = new Task();

    task.id = id;

    return task.remove();
  }

  async get(id: string): Promise<Nullable<TaskDTO>> {
    const task = new Task();

    task.id = id;

    await task.load();

    return task.serialize();
  }

  async list(params: ListParams<TaskDTO>): Promise<TaskDTO[]> {
    const task = new Task();

    return task.list(params);
  }
}
