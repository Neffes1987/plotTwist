import { NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/constants';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Waterhole extends ActiveRecord<WaterholeDTO> {
  name = '';
  description = '';

  constructor() {
    super(new AsyncStoreDataGateway('waterhole'));
  }

  serialize(): WaterholeDTO {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }

  validate(): void {
    const validator = new DtoValidator(this.serialize());

    validator.checkFieldRange([{ propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: SHORT_VALUE_MAX_LENGTH }]);
  }

  list(params: ListParams<WaterholeDTO>): Promise<WaterholeDTO[]> {
    return this._gateway.list(params);
  }
}
