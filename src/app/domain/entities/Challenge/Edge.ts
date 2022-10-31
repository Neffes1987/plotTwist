import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/constants';
import { EdgeDTO } from '../../../../types/entities/edge';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Edge extends ActiveRecord<EdgeDTO> {
  name = '';
  description = '';
  edgeImpact = '';
  readonly type = 'edge';

  constructor() {
    super(new AsyncStoreDataGateway('edge'));
  }

  serialize(): EdgeDTO {
    return {
      description: this.description,
      edgeImpact: this.edgeImpact,
      id: this.id,
      name: this.name,
      type: this.type,
    };
  }

  validate(): void {
    const error = new ValidationError();

    const validator = new DtoValidator<Partial<EdgeDTO>>(this.serialize());

    validator.checkRequiredFields(['type']);

    try {
      validator.checkFieldRange([
        { propertyName: 'edgeImpact', min: SHORT_VALUE_MAX_LENGTH, max: MIDDLE_VALUE_MAX_LENGTH },
        { propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: SHORT_VALUE_MAX_LENGTH },
      ]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
