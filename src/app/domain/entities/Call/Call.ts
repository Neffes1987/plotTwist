import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH } from '../../../../frontend/Screens/Tasks/constants';
import { CallDTO } from '../../../../types/entities/call';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Call extends ActiveRecord<CallDTO> implements Serialization<CallDTO> {
  partyMotivation = '';
  name = '';
  description = '';
  type: CallDTO['type'];

  constructor() {
    super(new AsyncStoreDataGateway('call'));
  }

  serialize(): CallDTO {
    return {
      id: this.id,
      type: this.type,
      partyMotivation: this.partyMotivation,
      name: this.name,
      description: this.description,
    };
  }

  unSerialize(rawData: CallDTO): void {
    const { partyMotivation, type, description, id, name } = rawData;

    this.partyMotivation = partyMotivation;
    this.type = type;
    this.description = description;
    this.id = id;
    this.name = name;
  }

  validate(): void {
    const error = new ValidationError();

    const validator = new DtoValidator<Partial<CallDTO>>(this.serialize());

    try {
      validator.checkFieldRange([
        { propertyName: 'partyMotivation', min: null, max: MIDDLE_VALUE_MAX_LENGTH },
        { propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: null },
      ]);
    } catch (e) {
      error.merge(e);
    }

    try {
      validator.checkRequiredFields(['type']);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }

  list(params: ListParams<CallDTO>): Promise<CallDTO[]> {
    return this._gateway.list(params);
  }
}
