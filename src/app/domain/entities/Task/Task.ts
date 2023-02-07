import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/constants';
import { TaskDTO } from '../../../../types/entities/task';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Task extends ActiveRecord<TaskDTO> implements Serialization<TaskDTO> {
  plotGoal = '';
  name = '';
  description = '';

  constructor() {
    super(new AsyncStoreDataGateway('law'));
  }

  serialize(): TaskDTO {
    return {
      id: this.id,
      plotGoal: this.plotGoal,
      name: this.name,
      description: this.description,
    };
  }

  unSerialize(rawData: TaskDTO): void {
    const { plotGoal, description, id, name } = rawData;

    this.plotGoal = plotGoal;
    this.description = description;
    this.id = id;
    this.name = name;
  }

  validate(): void {
    const error = new ValidationError();

    const validator = new DtoValidator<Partial<TaskDTO>>(this.serialize());

    try {
      validator.checkFieldRange([
        { propertyName: 'plotGoal', min: SHORT_VALUE_MAX_LENGTH, max: MIDDLE_VALUE_MAX_LENGTH },
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
