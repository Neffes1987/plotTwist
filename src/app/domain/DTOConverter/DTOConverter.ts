import { AbstractEntity } from '../entities/AbstractEntity/AbstractEntity';
import { createEntity } from '../entities/createEntity';
import { EntityType } from '../entities/interface';

import { DTOBaseInterface, IDTOConverter } from './IDTOConverter';

export class DTOConverter implements IDTOConverter {
  readonly type?: EntityType;

  constructor(type?: EntityType) {
    this.type = type;
  }

  toEntity(object: DTOBaseInterface): AbstractEntity {
    const type = this.type ?? object.type;

    if (!type) {
      throw new Error('TYPE for dto was not provided');
    }

    const entity = createEntity(type);

    entity.unSerializeToEntity(object);

    return entity;
  }
}
