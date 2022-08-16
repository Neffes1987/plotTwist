import { Guardian } from '../../Character/Guardian/Guardian';
import { AbstractChallenge } from '../AbstractChallenge/AbstractChallenge';
import { Task } from '../Task/Task';

export class Edge extends AbstractChallenge {
  private _guardian: Nullable<Guardian> = null;
  private _tasks: Task[] = [];

  constructor() {
    super('edge');
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  get guardian(): Nullable<Guardian> {
    return this._guardian;
  }

  setGuard(newValue: Guardian): void {
    this._guardian = newValue;
  }

  setTasks(newValue: Task[]): void {
    this._tasks = newValue;
  }
}
