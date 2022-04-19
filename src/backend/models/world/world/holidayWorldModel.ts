import { IValidatorConfiguration } from '../../../base/abstractModel';

import { ICommonWorld, WorldModel } from './worldModel';

export type HolidayType = 'inAShelter' | 'treasure' | 'victory' | 'getSword';

export type HolidaySubType = 'potionSteeling' | 'initiative' | 'newVision' | 'extraVision' | 'epiphania' | 'skewVision';

export type ChaseType = 'godSaving' | 'followersChase' | 'shadowRunning';

export interface IHolidayWorldModel extends ICommonWorld {
  shadowRevenge: string; // not required
  holidayType: HolidayType;
  holidaySubType?: HolidaySubType; // not required
  chase?: ChaseType;
}

export class HolidayWorldModel extends WorldModel {
  private _shadowRevenge = ''; // not required
  private _holidayType: HolidayType = 'inAShelter';
  private _holidaySubType?: HolidaySubType; // not required
  private _chase?: ChaseType;

  constructor(data: IHolidayWorldModel) {
    super('holiday', data);
    this._shadowRevenge = data.shadowRevenge;
    this._holidayType = data.holidayType;
    this._holidaySubType = data.holidaySubType;
    this._chase = data.chase;
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

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      shadowRevenge: this._shadowRevenge,
      holidayType: this._holidayType,
      HolidaySubType: this._holidaySubType,
      chaseType: this._chase,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [...super.getValidationConfig(), { name: 'holidayType' }, { name: 'chase' }];
  }
}
