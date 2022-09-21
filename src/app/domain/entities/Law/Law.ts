import { LawDTO } from 'backend';

import { MIDDLE_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../constants';
import { ValidationError } from '../../../errors/ValidationError';
import { AbstractEntity } from '../AbstractEntity/AbstractEntity';
import { EntityValidator } from '../AbstractEntity/EntityValidator';
// import { Mentor } from '../Character/Mentor/Mentor';

export class Law extends AbstractEntity {
  isBroken = false;
  private _punishment = '';
  // private readonly _mentors: Mentor[] = [];

  constructor() {
    super();
  }

  get punishment(): string {
    return this._punishment;
  }

  // get mentors(): Mentor[] {
  // return this._mentors;
  // }

  setPunishment(newValue: string): void {
    this._punishment = newValue;
  }

  // setMentors(newValue: Mentor[]): void {
  // this._mentors = newValue;
  // }

  serialize(): LawDTO {
    return {
      ...super.serialize(),
      punishment: this._punishment,
      isBroken: this.isBroken,
    };
  }

  unSerializeToEntity(rawData: LawDTO): void {
    super.unSerializeToEntity(rawData);
    this.setPunishment(rawData.punishment ?? '');
    this.isBroken = rawData.isBroken;
  }

  validate(): void {
    const error = new ValidationError();

    try {
      super.validate();
    } catch (e) {
      error.merge(e);
    }

    const validator = new EntityValidator<Partial<LawDTO>>(this.serialize());

    try {
      validator.checkFieldRange([{ propertyName: 'punishment', min: SHORT_VALUE_MAX_LENGTH, max: MIDDLE_VALUE_MAX_LENGTH }]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
