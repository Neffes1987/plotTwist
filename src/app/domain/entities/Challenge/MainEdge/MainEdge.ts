import { Shadow } from '../../Character/Shadow/Shadow';
import { AbstractChallenge } from '../AbstractChallenge/AbstractChallenge';
import { Task } from '../Task/Task';

import { MainEdgeType, ShadowEncounterType } from './interface';

export class MainEdge extends AbstractChallenge {
  readonly mainEdgeType: MainEdgeType;
  private _tasks: Task[] = [];
  private _shadow: Nullable<Shadow> = null;

  private _edgeImpact = '';
  private _shadowEncounterType: Nullable<ShadowEncounterType> = null;

  constructor(mainEdgeType: MainEdgeType) {
    super('mainEdge');
    this.mainEdgeType = mainEdgeType;
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  get edgeImpact(): string {
    return this._edgeImpact;
  }

  get shadowEncounterType(): Nullable<ShadowEncounterType> {
    return this._shadowEncounterType;
  }

  get shadow(): Nullable<Shadow> {
    return this._shadow;
  }

  setEdgeImpact(newValue: string): void {
    this._edgeImpact = newValue;
  }

  setShadowEncounterType(newValue: ShadowEncounterType): void {
    this._shadowEncounterType = newValue;
  }

  setShadow(newValue: Shadow): void {
    this._shadow = newValue;
  }

  setTasks(newValue: Task[]): void {
    this._tasks = newValue;
  }
}
