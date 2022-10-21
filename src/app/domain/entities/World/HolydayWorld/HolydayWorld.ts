import { ChaseTypeEnum, HolidayGetSwordTypeEnum, HolidayTypeEnum, WorldEnum } from '../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/constants';
import { HolidayWorldDTO } from '../../../../../types/entities/world';
import { ValidationError } from '../../../../errors/ValidationError';
import { DtoValidator } from '../../../../infrastructure/validators/DtoValidator/DtoValidator';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

export class HolidayWorld extends AbstractWorld<HolidayWorldDTO> {
  shadowRevenge = ''; // not required
  holidayType: HolidayTypeEnum = HolidayTypeEnum.InAShelter;
  holidayGetSwordType?: HolidayGetSwordTypeEnum; // not required
  chase?: ChaseTypeEnum;

  constructor() {
    super(WorldEnum.HolidayWorld);
  }

  serialize(): HolidayWorldDTO {
    return {
      ...super.serialize(),
      shadowRevenge: this.shadowRevenge,
      holidayType: this.holidayType,
      holidayGetSwordType: this.holidayGetSwordType,
      chase: this.chase,
    };
  }

  unSerialize(object: HolidayWorldDTO): void {
    super.unSerialize(object);
    const { shadowRevenge, chase, holidayType, holidayGetSwordType } = object;

    this.shadowRevenge = shadowRevenge;
    this.chase = chase;
    this.holidayType = holidayType;
    this.holidayGetSwordType = holidayGetSwordType;
  }

  validate(): void {
    const error = new ValidationError();

    try {
      super.validate();
    } catch (e) {
      error.merge(e);
    }

    const validator = new DtoValidator<Partial<HolidayWorldDTO>>(this.serialize());
    const requiredFields: (keyof HolidayWorldDTO)[] = ['holidayType'];

    if (this.holidayType === HolidayTypeEnum.GetSword) {
      requiredFields.push('holidayGetSwordType');
    }

    const fieldRange = [];

    if (this.chase === ChaseTypeEnum.ShadowRunning) {
      fieldRange.push({ propertyName: 'shadowRevenge' as const, min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH });
    }

    try {
      validator.checkRequiredFields(requiredFields);
    } catch (e) {
      error.merge(e);
    }

    try {
      validator.checkFieldRange(fieldRange);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
