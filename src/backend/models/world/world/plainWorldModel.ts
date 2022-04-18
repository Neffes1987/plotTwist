import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {ICommonWorld, WorldModel} from './worldModel';

export interface IPlainWorldWorld extends ICommonWorld {
  introduction: string;
  charactersProblems: string[];
  worldProblems: string[];
}

export class PlainWorldModel extends WorldModel {
  static readonly INTRODUCTION_MAX_LENGTH = 2048;
  static readonly WORLD_PROBLEMS_MIN_LENGTH = 2;

  _introduction = '';
  _charactersProblems: string[] = []; // not required
  _worldProblems: string[] = [];

  constructor(data: IPlainWorldWorld) {
    super('plainWorld', data);

    this.setIntroduction(data.introduction);
    this.setWorldProblems(data.worldProblems);
    this.setCharactersProblems(data.charactersProblems);
  }

  setIntroduction(newValue: string): void {
    this._introduction = newValue;
  }

  setCharactersProblems(newValue: string[]): void {
    this._charactersProblems = newValue;
  }

  setWorldProblems(newValue: string[]): void {
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

  validateMap(data: IPlainWorldWorld): void {
    super.validateMap(data);

    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.introduction == null) {
      emptyProperties.push('introduction');
    } else if (data.introduction.length > PlainWorldModel.INTRODUCTION_MAX_LENGTH) {
      notSatisfiedProps.introduction = 'more_then_$INTRODUCTION_MAX_LENGTH';
    }

    if (data.worldProblems == null) {
      emptyProperties.push('worldProblems');
    } else if (data.worldProblems.length < PlainWorldModel.WORLD_PROBLEMS_MIN_LENGTH) {
      notSatisfiedProps.worldProblems = 'less_then_$WORLD_PROBLEMS_MIN_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }
}
