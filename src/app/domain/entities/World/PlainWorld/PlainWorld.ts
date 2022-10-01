import { PlainWorldDTO } from 'backend';

import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../constants';
import { ValidationError } from '../../../../errors/ValidationError';
import { EntityValidator } from '../../AbstractTextEntity/EntityValidator';
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
      problems: this.problems,
    };
  }

  unSerializeToEntity(object: PlainWorldDTO): void {
    super.unSerializeToEntity(object);
    this.setIntroduction(object.introduction);
    this.setProblems(object.problems ?? []);
  }

  validate(): void {
    const error = new ValidationError();

    try {
      super.validate();
    } catch (e) {
      error.merge(e);
    }

    const validator = new EntityValidator<Partial<PlainWorldDTO>>(this.serialize());

    try {
      validator.checkFieldRange([{ propertyName: 'introduction', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH }]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
