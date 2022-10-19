import { WorldEnum } from '../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/constants';
import { HiddenCaveWorldDTO } from '../../../../../types/entities/world';
import { ValidationError } from '../../../../errors/ValidationError';
import { DtoValidator } from '../../../../infrastructure/validators/DtoValidator/DtoValidator';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

export class HiddenCaveWorld extends AbstractWorld<HiddenCaveWorldDTO> {
  mainEdgeInformation = '';
  shadowIntroduction = '';
  partyPlan = '';

  constructor(id?: string) {
    super(WorldEnum.HiddenCaveWorld, id ?? '');
  }

  serialize(): HiddenCaveWorldDTO {
    return {
      ...super.serialize(),
      mainEdgeInformation: this.mainEdgeInformation,
      partyPlan: this.partyPlan,
      shadowIntroduction: this.shadowIntroduction,
    };
  }

  unSerialize(object: HiddenCaveWorldDTO): void {
    super.unSerialize(object);
    const { partyPlan, mainEdgeInformation, shadowIntroduction } = object;

    this.partyPlan = partyPlan;
    this.mainEdgeInformation = mainEdgeInformation;
    this.shadowIntroduction = shadowIntroduction;
  }

  validate(): void {
    const error = new ValidationError();

    try {
      super.validate();
    } catch (e) {
      error.merge(e);
    }

    const validator = new DtoValidator<Partial<HiddenCaveWorldDTO>>(this.serialize());

    try {
      validator.checkFieldRange([
        { propertyName: 'partyPlan', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH },
        { propertyName: 'shadowIntroduction', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH },
        { propertyName: 'mainEdgeInformation', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH },
      ]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
