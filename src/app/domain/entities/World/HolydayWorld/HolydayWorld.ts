import { HolidayWorldDTO } from 'backend';

import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../constants';
import { EntityValidator } from '../../AbstractEntity/EntityValidator';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

import { ChaseType, HolidayGetSwordType, HolidayType } from './interface';

export class HolidayWorld extends AbstractWorld {
  private _shadowRevenge = ''; // not required
  private _holidayType: HolidayType = 'inAShelter';
  private _holidayGetSwordType?: HolidayGetSwordType; // not required
  private _chase?: ChaseType;

  constructor() {
    super('holiday');
  }

  get shadowRevenge(): string {
    return this._shadowRevenge;
  }

  get holidayType(): HolidayType {
    return this._holidayType;
  }

  get holidayGetSwordType(): HolidayGetSwordType | undefined {
    return this._holidayGetSwordType;
  }

  get chase(): ChaseType | undefined {
    return this._chase;
  }

  setChase(newValue: ChaseType): void {
    this._chase = newValue;
  }

  setShadowRevenge(newValue: string): void {
    this._shadowRevenge = newValue;
  }

  setHolidayType(newValue: HolidayType): void {
    this._holidayType = newValue;
  }

  setHolidaySubType(newValue: HolidayGetSwordType): void {
    this._holidayGetSwordType = newValue;
  }

  serialize(): HolidayWorldDTO {
    return {
      ...super.serialize(),
      type: 'holiday',
      shadowRevenge: this.shadowRevenge,
      holidayType: this.holidayType,
      holidayGetSwordType: this.holidayGetSwordType,
      chase: this.chase,
    };
  }

  unSerializeToEntity(object: HolidayWorldDTO): void {
    super.unSerializeToEntity(object);

    this.setShadowRevenge(object.shadowRevenge);
    this._chase = object.chase;
    this.setHolidayType(object.holidayType);
    this._holidayGetSwordType = object.holidayGetSwordType;
  }

  validate(): void {
    super.validate();

    const validator = new EntityValidator<Partial<HolidayWorldDTO>>(this.serialize());
    const requiredFields: (keyof HolidayWorldDTO)[] = ['holidayType'];

    if (this.holidayType === 'getSword') {
      requiredFields.push('holidayGetSwordType');
    }

    const fieldRange = [];

    if (this.chase === 'shadowRunning') {
      fieldRange.push({ propertyName: 'shadowRevenge' as const, min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH });
    }

    validator.checkRequiredFields(requiredFields);
    validator.checkFieldRange(fieldRange);
  }
}
