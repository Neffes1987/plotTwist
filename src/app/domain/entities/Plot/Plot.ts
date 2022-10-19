import { StatusEnum } from '../../../../constants/status.enum';
import { NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/constants';
import { PlotDTO } from '../../../../types/entities/plot';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Plot extends ActiveRecord<PlotDTO> {
  id = '';
  status: StatusEnum = StatusEnum.Draft;
  name: string;

  constructor(id?: string) {
    super(new AsyncStoreDataGateway<PlotDTO>('plot'), id ?? '');
  }

  serialize(): PlotDTO {
    return {
      status: this.status,
      id: this.id,
      name: this.name,
    };
  }

  validate(): void {
    const validator = new DtoValidator(this.serialize());

    validator.checkFieldRange([{ propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: SHORT_VALUE_MAX_LENGTH }]);
  }

  list(params: ListParams<PlotDTO>): Promise<PlotDTO[]> {
    return this._gateway.list(params);
  }
}
