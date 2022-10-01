import { LawDTO } from 'backend';

import { MIDDLE_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../constants';
import { ValidationError } from '../../../errors/ValidationError';
import { AbstractTextEntity } from '../AbstractTextEntity/AbstractTextEntity';
import { EntityValidator } from '../AbstractTextEntity/EntityValidator';
// import { Mentor } from '../Character/Mentor/Mentor';

export class Law extends AbstractTextEntity {
  isBroken = false;
  private _punishment = '';
  private _worldIds: string[] = [];
  // private readonly _mentors: Mentor[] = [];

  constructor() {
    super();
  }

  get punishment(): string {
    return this._punishment;
  }

  get worldIds(): string[] {
    return this._worldIds;
  }

  // get mentors(): Mentor[] {
  // return this._mentors;
  // }

  setPunishment(newValue: string): void {
    this._punishment = newValue;
  }

  setWorlds(newValue: string[]): void {
    this._worldIds = newValue;
  }

  // setMentors(newValue: Mentor[]): void {
  // this._mentors = newValue;
  // }

  serialize(): LawDTO {
    return {
      ...super.serialize(),
      punishment: this._punishment,
      isBroken: this.isBroken,
      worldIds: this._worldIds,
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
