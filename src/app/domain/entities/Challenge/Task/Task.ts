import { AbstractChallenge } from '../AbstractChallenge/AbstractChallenge';

export class Task extends AbstractChallenge {
  private _plotGoal = '';

  constructor() {
    super('task');
  }

  get plotGoal(): string {
    return this._plotGoal;
  }

  setPlotGoal(newValue: string): void {
    this._plotGoal = newValue;
  }
}
