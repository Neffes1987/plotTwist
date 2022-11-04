import { MainEdgeType, ShadowEncounterType } from '../../../../constants/edge.enum';
import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/constants';
import { EdgeDTO } from '../../../../types/entities/edge';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Edge extends ActiveRecord<EdgeDTO> {
  readonly mainEdgeType: MainEdgeType;
  description: string;
  name: string;
  edgeImpact: string;
  readonly type;
  shadowEncounterType: ShadowEncounterType;

  constructor(type: EdgeDTO['type']) {
    super(new AsyncStoreDataGateway('edge'));

    this.type = type;
  }

  serialize(): EdgeDTO {
    return {
      mainEdgeType: this.mainEdgeType,
      shadowEncounterType: this.shadowEncounterType,
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

    if (this.type === 'mainEdge') {
      validator.checkRequiredFields(['mainEdgeType']);

      if (this.mainEdgeType === 'shadowEncounter') {
        validator.checkRequiredFields(['shadowEncounterType']);
      }
    }

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
