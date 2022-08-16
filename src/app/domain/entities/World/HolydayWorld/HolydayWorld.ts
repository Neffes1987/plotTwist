import { HolidayWorldDTO } from 'backend';

import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

import { ChaseType, HolidaySubType, HolidayType } from './interface';

export class HolidayWorld extends AbstractWorld {
  private _shadowRevenge = ''; // not required
  private _holidayType: HolidayType = 'inAShelter';
  private _holidaySubType?: HolidaySubType; // not required
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

  get holidaySubType(): HolidaySubType | undefined {
    return this._holidaySubType;
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

  setHolidaySubType(newValue: HolidaySubType): void {
    this._holidaySubType = newValue;
  }

  serialize(): HolidayWorldDTO {
    return {
      ...super.serialize(),
      type: 'holiday',
      shadowRevenge: this.shadowRevenge,
      holidayType: this.holidayType,
      holidaySubType: this.holidaySubType,
      chase: this.chase,
    };
  }

  unSerializeToEntity(object: HolidayWorldDTO): void {
    super.unSerializeToEntity(object);
    this.setShadowRevenge(object.shadowRevenge);
    this._chase = object.chase;
    this.setHolidayType(object.holidayType);
    this._holidaySubType = object.holidaySubType;
  }
}
