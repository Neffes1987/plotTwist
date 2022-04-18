import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {ICommonWorld, WorldModel} from './worldModel';

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
  static readonly INTRODUCTION_MAX_LENGTH = 2048;
  static readonly WORLD_PROBLEMS_MIN_LENGTH = 2;

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

  validateMap(data: IHolidayWorldModel): void {
    super.validateMap(data);

    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.holidayType == null) {
      emptyProperties.push('introduction');
    }

    if (data.chase == null) {
      emptyProperties.push('worldProblems');
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }
}
