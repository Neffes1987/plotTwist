import { MainEdgeType, ShadowEncounterType } from '../../../../constants/edge.enum';
import { NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../frontend/Screens/Tasks/constants';
import { TaskDTO } from '../../../../types/entities/task';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Task extends ActiveRecord<TaskDTO> {
  mainEdgeType?: MainEdgeType;
  description: string;
  name: string;
  edgeImpact: string;
  plotGoal: string;
  type: TaskDTO['type'] = 'edge';
  shadowEncounterType?: ShadowEncounterType;

  constructor() {
    super(new AsyncStoreDataGateway('task'));
  }

  serialize(): TaskDTO {
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

  unSerialize(rawData: TaskDTO): void {
    const { description, edgeImpact, mainEdgeType, shadowEncounterType, type, id, name } = rawData;

    this.edgeImpact = edgeImpact;
    this.mainEdgeType = mainEdgeType;
    this.shadowEncounterType = shadowEncounterType;
    this.type = type;
    this.description = description;
    this.id = id;
    this.name = name;
  }

  validate(): void {
    const error = new ValidationError();

    const validator = new DtoValidator<Partial<TaskDTO>>(this.serialize());

    if (this.type === 'mainEdge') {
      validator.checkRequiredFields(['mainEdgeType']);

      if (this.mainEdgeType === 'shadowEncounter') {
        validator.checkRequiredFields(['shadowEncounterType']);
      }
    }

    try {
      validator.checkFieldRange([
        { propertyName: 'edgeImpact', min: SHORT_VALUE_MAX_LENGTH, max: SHORT_VALUE_MAX_LENGTH },
        { propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: null },
      ]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
