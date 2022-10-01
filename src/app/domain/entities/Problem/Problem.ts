import { AbstractTextEntity } from '../AbstractTextEntity/AbstractTextEntity';

import { ProblemType } from './interface';

export class Problem extends AbstractTextEntity {
  private _type: ProblemType = 'world';
  private _isSolved = false;

  constructor() {
    super();
  }

  get type(): ProblemType {
    return this._type;
  }

  get isSolved(): boolean {
    return this._isSolved;
  }

  setStatus(newValue: ProblemType): void {
    this._type = newValue;
  }

  setWorlds(newValue: boolean): void {
    this._isSolved = newValue;
  }
}
