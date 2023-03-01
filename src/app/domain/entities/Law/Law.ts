import { NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/Screens/Tasks/constants';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Law extends ActiveRecord<LawDTO> implements Serialization<LawDTO> {
  punishment = '';
  name = '';
  description = '';

  constructor() {
    super(new AsyncStoreDataGateway('law'));
  }

  serialize(): LawDTO {
    return {
      id: this.id,
      punishment: this.punishment,
      name: this.name,
      description: this.description,
    };
  }

  unSerialize(rawData: LawDTO): void {
    const { punishment, description, id, name } = rawData;

    this.punishment = punishment;
    this.description = description;
    this.id = id;
    this.name = name;
  }

  validate(): void {
    const error = new ValidationError();

    const validator = new DtoValidator<Partial<LawDTO>>(this.serialize());

    try {
      validator.checkFieldRange([
        { propertyName: 'punishment', min: SHORT_VALUE_MAX_LENGTH, max: null },
        { propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: null },
      ]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }

  list(params: ListParams<LawDTO>): Promise<LawDTO[]> {
    return this._gateway.list(params);
  }
}
