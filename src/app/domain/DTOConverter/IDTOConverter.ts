import { AbstractEntity } from '../entities/AbstractEntity/AbstractEntity';
import { CommonDTO, EntityType } from '../entities/interface';

export interface DTOBaseInterface extends CommonDTO {
  type?: EntityType;
}

export interface IDTOConverter {
  toEntity: (dto: DTOBaseInterface) => AbstractEntity;
}
