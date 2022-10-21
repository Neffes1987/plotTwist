import { WorldEnum } from '../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/constants';
import { PlainWorldDTO } from '../../../../../types/entities/world';
import { ValidationError } from '../../../../errors/ValidationError';
import { DtoValidator } from '../../../../infrastructure/validators/DtoValidator/DtoValidator';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

export class PlainWorld extends AbstractWorld<PlainWorldDTO> {
  introduction = '';

  constructor() {
    super(WorldEnum.PlainWorld);
  }

  serialize(): PlainWorldDTO {
    return {
      ...super.serialize(),
      introduction: this.introduction,
    };
  }

  unSerialize(object: PlainWorldDTO): void {
    super.unSerialize(object);
    this.introduction = object.introduction;
  }

  validate(): void {
    const error = new ValidationError();

    try {
      super.validate();
    } catch (e) {
      error.merge(e);
    }

    const validator = new DtoValidator<Partial<PlainWorldDTO>>(this.serialize());

    try {
      validator.checkFieldRange([{ propertyName: 'introduction', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH }]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
