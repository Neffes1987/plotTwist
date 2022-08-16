import { PlainWorldDTO } from 'backend';

import { Problem } from '../../Problem/Problem';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

export class PlainWorld extends AbstractWorld {
  private _introduction = '';
  private _problems: Problem[] = [];

  constructor() {
    super('plainWorld');
  }

  get introduction(): string {
    return this._introduction;
  }

  get problems(): Problem[] {
    return this._problems;
  }

  setIntroduction(newValue: string): void {
    this._introduction = newValue;
  }

  setProblems(newValue: Problem[]): void {
    this._problems = newValue;
  }

  serialize(): PlainWorldDTO {
    return {
      ...super.serialize(),
      type: 'plainWorld',
      introduction: this.introduction,
    };
  }

  unSerializeToEntity(object: PlainWorld): void {
    super.unSerializeToEntity(object);
    this.setIntroduction(object.introduction);
    this.setProblems(object.problems);
  }
}
