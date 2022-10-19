import { WorldEnum } from '../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/constants';
import { PrivateWorldDTO } from '../../../../../types/entities/world';
import { ValidationError } from '../../../../errors/ValidationError';
import { DtoValidator } from '../../../../infrastructure/validators/DtoValidator/DtoValidator';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

export class PrivateWorld extends AbstractWorld<PrivateWorldDTO> {
  contrast = '';

  constructor(id?: string) {
    super(WorldEnum.PrivateWorld, id ?? '');
  }

  serialize(): PrivateWorldDTO {
    return {
      ...super.serialize(),
      contrast: this.contrast,
    };
  }

  unSerialize(object: PrivateWorldDTO): void {
    super.unSerialize(object);
    this.contrast = object.contrast;
  }

  validate(): void {
    const error = new ValidationError();

    try {
      super.validate();
    } catch (e) {
      error.merge(e);
    }

    const validator = new DtoValidator<Partial<PrivateWorldDTO>>(this.serialize());

    try {
      validator.checkFieldRange([{ propertyName: 'contrast', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH }]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
