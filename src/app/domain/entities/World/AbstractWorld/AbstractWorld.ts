import { StatusEnum } from '../../../../../constants/status.enum';
import { WorldEnum } from '../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/constants';
import { WorldDTO } from '../../../../../types/entities/world';
import { ValidationError } from '../../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export abstract class AbstractWorld<DTO extends WorldDTO> extends ActiveRecord<DTO> implements Serialization<DTO> {
  type: WorldEnum;
  story = '';
  name = '';
  reference = '';
  timeline = '';
  failPrice = '';
  status: StatusEnum;

  protected constructor(worldType: WorldEnum, id: string) {
    super(new AsyncStoreDataGateway(worldType), id);
    this.type = worldType;
  }

  // @ts-ignore
  serialize(): WorldDTO {
    return {
      id: this.id,
      name: this.name,
      failPrice: this.failPrice,
      reference: this.reference,
      story: this.story,
      timeline: this.timeline,
      type: this.type,
      status: this.status,
    };
  }

  unSerialize(object: WorldDTO): void {
    const { id, name, failPrice, reference, story, timeline, type } = object;

    this.id = id;
    this.name = name;
    this.failPrice = failPrice;
    this.reference = reference;
    this.story = story;
    this.timeline = timeline;
    this.type = type;
  }

  validate(): void {
    const error = new ValidationError();
    const validator = new DtoValidator(this.serialize());

    try {
      validator.checkRequiredFields(['type']);
    } catch (e) {
      error.merge(e);
    }

    try {
      validator.checkFieldRange([
        { propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: SHORT_VALUE_MAX_LENGTH },
        { propertyName: 'failPrice', min: SHORT_VALUE_MAX_LENGTH, max: MIDDLE_VALUE_MAX_LENGTH },
        { propertyName: 'reference', min: SHORT_VALUE_MAX_LENGTH, max: MIDDLE_VALUE_MAX_LENGTH },
        { propertyName: 'story', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH },
        { propertyName: 'timeline', min: SHORT_VALUE_MAX_LENGTH, max: MIDDLE_VALUE_MAX_LENGTH },
      ]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
