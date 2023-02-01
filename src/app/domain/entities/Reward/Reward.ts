import { NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/constants';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Reward extends ActiveRecord<RewardDto> implements Serialization<RewardDto> {
  name = '';
  description = '';

  constructor() {
    super(new AsyncStoreDataGateway('Reward'));
  }

  serialize(): RewardDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }

  unSerialize(rawData: RewardDto): void {
    const { description, id, name } = rawData;

    this.description = description;
    this.id = id;
    this.name = name;
  }

  validate(): void {
    const error = new ValidationError();

    const validator = new DtoValidator<Partial<LawDTO>>(this.serialize());

    try {
      validator.checkFieldRange([{ propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: SHORT_VALUE_MAX_LENGTH }]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }

  list(params: ListParams<RewardDto>): Promise<RewardDto[]> {
    return this._gateway.list(params);
  }
}
