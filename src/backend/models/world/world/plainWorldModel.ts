import { IValidatorConfiguration } from '../../../base/abstractModel';

import { ICommonWorld, WorldModel } from './worldModel';

export interface IPlainWorldWorld extends ICommonWorld {
  introduction: string;
  charactersProblems: string;
  worldProblems: string;
}

export class PlainWorldModel extends WorldModel {
  static readonly WORLD_PROBLEMS_MIN_LENGTH = 2;

  private _introduction = '';
  private _charactersProblems = ''; // not required
  private _worldProblems = '';

  constructor(data: IPlainWorldWorld) {
    super('plainWorld', data);

    this.setIntroduction(data.introduction);
    this.setWorldProblems(data.worldProblems);
    this.setCharactersProblems(data.charactersProblems);
  }

  get introduction(): string {
    return this._introduction;
  }

  get worldProblems(): string {
    return this._worldProblems;
  }

  get charactersProblems(): string {
    return this._charactersProblems;
  }

  setIntroduction(newValue: string): void {
    this._introduction = newValue;
  }

  setCharactersProblems(newValue: string): void {
    this._charactersProblems = newValue;
  }

  setWorldProblems(newValue: string): void {
    this._worldProblems = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      introduction: this._introduction,
      charactersProblems: this._charactersProblems,
      worldProblems: this._worldProblems,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      { name: 'introduction', max: this.BIG_VALUE_MAX_LENGTH },
      { name: 'worldProblems', min: PlainWorldModel.WORLD_PROBLEMS_MIN_LENGTH },
    ];
  }
}
