import { StatusEnum } from '../../../../constants/status.enum';
import { ChaseTypeEnum, FinalTypeEnum, HolidayGetSwordTypeEnum, HolidayTypeEnum, PotionTypeEnum, WorldEnum } from '../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/Screens/Tasks/constants';
import { HolidayWorldDTO, WorldDTO } from '../../../../types/entities/world';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class World<DTO extends WorldDTO> extends ActiveRecord<DTO> implements Serialization<DTO> {
  type: WorldEnum;
  story = '';
  name = '';
  reference = '';
  timeline = '';
  failPrice = '';
  status: StatusEnum;
  contrast = '';
  finalType: FinalTypeEnum;
  potionType: PotionTypeEnum;
  cliffhanger = '';
  introduction = '';
  shadowRevenge = ''; // not required
  holidayType: HolidayTypeEnum = HolidayTypeEnum.InAShelter;
  holidayGetSwordType?: HolidayGetSwordTypeEnum; // not required
  chase?: ChaseTypeEnum;
  mainEdgeInformation = '';
  shadowIntroduction = '';
  partyPlan = '';

  constructor() {
    super(new AsyncStoreDataGateway('world'));
  }

  // @ts-ignore
  serialize(): WorldDTO {
    return {
      id: this.id,
      name: this.name,
      failPrice: this.failPrice,
      reference: this.reference,
      story: this.story,
      timeline: this.timeline,
      type: this.type,
      status: this.status,
      contrast: this.contrast,
      finalType: this.finalType,
      cliffhanger: this.cliffhanger,
      potionType: this.potionType,
      introduction: this.introduction,
      shadowRevenge: this.shadowRevenge,
      holidayType: this.holidayType,
      holidayGetSwordType: this.holidayGetSwordType,
      chase: this.chase,
      mainEdgeInformation: this.mainEdgeInformation,
      partyPlan: this.partyPlan,
      shadowIntroduction: this.shadowIntroduction,
    };
  }

  unSerialize(object: WorldDTO): void {
    const {
      id,
      name,
      failPrice,
      reference,
      story,
      timeline,
      type,
      status,
      finalType,
      cliffhanger,
      potionType,
      contrast,
      holidayGetSwordType,
      holidayType,
      mainEdgeInformation,
      introduction,
      shadowIntroduction,
      shadowRevenge,
      partyPlan,
      chase,
    } = object;

    this.id = id;
    this.name = name;
    this.failPrice = failPrice;
    this.reference = reference;
    this.story = story;
    this.timeline = timeline;
    this.type = type;
    this.status = status ?? StatusEnum.Draft;
    this.contrast = contrast;
    this.potionType = potionType;
    this.cliffhanger = cliffhanger;
    this.finalType = finalType;
    this.introduction = introduction;
    this.shadowRevenge = shadowRevenge;
    this.chase = chase;
    this.holidayType = holidayType;
    this.holidayGetSwordType = holidayGetSwordType;
    this.partyPlan = partyPlan;
    this.mainEdgeInformation = mainEdgeInformation;
    this.shadowIntroduction = shadowIntroduction;
  }

  validate(): void {
    const error = new ValidationError();
    const validator = new DtoValidator(this.serialize());

    try {
      validator.checkRequiredFields(['type']);
    } catch (e) {
      error.merge(e);
    }

    try {
      validator.checkFieldRange([
        { propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: SHORT_VALUE_MAX_LENGTH },
        { propertyName: 'failPrice', min: null, max: MIDDLE_VALUE_MAX_LENGTH },
        { propertyName: 'reference', min: null, max: MIDDLE_VALUE_MAX_LENGTH },
        { propertyName: 'story', min: null, max: BIG_VALUE_MAX_LENGTH },
        { propertyName: 'timeline', min: null, max: MIDDLE_VALUE_MAX_LENGTH },
      ]);
    } catch (e) {
      error.merge(e);
    }

    if (this.type === 'PrivateWorld') {
      try {
        validator.checkFieldRange([{ propertyName: 'contrast', min: null, max: BIG_VALUE_MAX_LENGTH }]);
      } catch (e) {
        error.merge(e);
      }
    }

    if (this.type === 'ReturnWithPotionWorld') {
      try {
        validator.checkFieldRange([{ propertyName: 'cliffhanger', min: null, max: BIG_VALUE_MAX_LENGTH }]);
      } catch (e) {
        error.merge(e);
      }
    }

    if (this.type === 'PlainWorld') {
      try {
        validator.checkFieldRange([{ propertyName: 'introduction', min: null, max: BIG_VALUE_MAX_LENGTH }]);
      } catch (e) {
        error.merge(e);
      }
    }

    if (this.type === 'HolidayWorld') {
      const requiredFields: (keyof HolidayWorldDTO)[] = ['holidayType'];

      if (this.holidayType === HolidayTypeEnum.GetSword) {
        requiredFields.push('holidayGetSwordType');
      }

      try {
        validator.checkRequiredFields(requiredFields);
      } catch (e) {
        error.merge(e);
      }

      const fieldRange = [];

      if (this.chase === ChaseTypeEnum.ShadowRunning) {
        fieldRange.push({ propertyName: 'shadowRevenge' as const, min: null, max: BIG_VALUE_MAX_LENGTH });
      }

      try {
        validator.checkFieldRange(fieldRange);
      } catch (e) {
        error.merge(e);
      }
    }

    if (this.type === 'HiddenCaveWorld') {
      try {
        validator.checkFieldRange([
          { propertyName: 'partyPlan', min: null, max: BIG_VALUE_MAX_LENGTH },
          { propertyName: 'shadowIntroduction', min: null, max: BIG_VALUE_MAX_LENGTH },
          { propertyName: 'mainEdgeInformation', min: null, max: BIG_VALUE_MAX_LENGTH },
        ]);
      } catch (e) {
        error.merge(e);
      }
    }

    if (error.length) {
      throw error;
    }
  }
}
