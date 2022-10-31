import { BIG_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/constants';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Task extends ActiveRecord<TaskDTO> {
  description = '';
  name = '';
  plotGoal = '';

  constructor() {
    super(new AsyncStoreDataGateway('task'));
  }

  serialize(): TaskDTO {
    return {
      description: this.description,
      id: this.id,
      name: this.name,
      plotGoal: this.plotGoal,
    };
  }

  validate(): void {
    const error = new ValidationError();

    const validator = new DtoValidator<Partial<TaskDTO>>(this.serialize());

    try {
      validator.checkFieldRange([
        { propertyName: 'plotGoal', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH },
        { propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: SHORT_VALUE_MAX_LENGTH },
      ]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }

  list(params: ListParams<TaskDTO>): Promise<TaskDTO[]> {
    return this._gateway.list(params);
  }
}
