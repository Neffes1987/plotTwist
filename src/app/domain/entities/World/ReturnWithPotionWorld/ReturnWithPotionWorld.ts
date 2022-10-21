import { FinalTypeEnum, PotionTypeEnum, WorldEnum } from '../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH } from '../../../../../frontend/constants';
import { ReturnWithPotionWorldDTO } from '../../../../../types/entities/world';
import { ValidationError } from '../../../../errors/ValidationError';
import { DtoValidator } from '../../../../infrastructure/validators/DtoValidator/DtoValidator';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

export class ReturnWithPotionWorld extends AbstractWorld<ReturnWithPotionWorldDTO> {
  finalType: FinalTypeEnum;
  potionType: PotionTypeEnum;
  cliffhanger = '';

  constructor() {
    super(WorldEnum.ReturnWithPotionWorld);
  }

  serialize(): ReturnWithPotionWorldDTO {
    return {
      ...super.serialize(),
      finalType: this.finalType,
      cliffhanger: this.cliffhanger,
      potionType: this.potionType,
    };
  }

  unSerialize(object: ReturnWithPotionWorldDTO): void {
    super.unSerialize(object);
    const { potionType, cliffhanger, finalType } = object;

    this.potionType = potionType;
    this.cliffhanger = cliffhanger;
    this.finalType = finalType;
  }

  validate(): void {
    const error = new ValidationError();

    try {
      super.validate();
    } catch (e) {
      error.merge(e);
    }

    const validator = new DtoValidator<Partial<ReturnWithPotionWorldDTO>>(this.serialize());

    try {
      validator.checkFieldRange([{ propertyName: 'cliffhanger', min: null, max: BIG_VALUE_MAX_LENGTH }]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
