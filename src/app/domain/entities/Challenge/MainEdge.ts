import { MainEdgeType, ShadowEncounterType } from '../../../../constants/edge.enum';
import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/constants';
import { MainEdgeDTO } from '../../../../types/entities/edge';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class MainEdge extends ActiveRecord<MainEdgeDTO> {
  readonly mainEdgeType: MainEdgeType;
  description: string;
  name: string;
  edgeImpact: string;
  readonly type = 'mainEdge';
  shadowEncounterType: ShadowEncounterType;

  constructor(mainEdgeType: MainEdgeType) {
    super(new AsyncStoreDataGateway('mainEdge'));
    this.mainEdgeType = mainEdgeType;
  }

  serialize(): MainEdgeDTO {
    return {
      description: this.description,
      edgeImpact: this.edgeImpact,
      id: this.id,
      mainEdgeType: this.mainEdgeType,
      name: this.name,
      shadowEncounterType: this.shadowEncounterType,
      type: this.type,
    };
  }

  validate(): void {
    const error = new ValidationError();

    const validator = new DtoValidator<Partial<MainEdgeDTO>>(this.serialize());

    validator.checkRequiredFields(['type', 'mainEdgeType']);

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
