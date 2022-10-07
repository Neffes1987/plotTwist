import { TextDTO } from 'backend';

import { AbstractEntity } from '../../domain/entities/AbstractEntity/AbstractEntity';
import { createEntity } from '../../domain/entities/createEntity';
import { CommonDTO, EntityType } from '../../domain/entities/interface';
import { ListParams } from '../../domain/interface';
import { AbstractConstructor } from '../../domain/rulles/Constructors/AbstractConstructor/AbstractConstructor';
import { ICommonController } from '../interface';

export class Controller implements ICommonController {
  private readonly builder: AbstractConstructor;
  private readonly type?: string;

  constructor(builder: AbstractConstructor, type?: string) {
    this.builder = builder;
    this.type = type;
  }

  create(data: Omit<TextDTO, 'id'>): Promise<string> {
    return this.builder.create(this.convertDTOtoEntity(data));
  }

  delete(id: string): Promise<boolean> {
    return this.builder.delete(id);
  }

  async get(id: string): Promise<Nullable<TextDTO>> {
    const entity = await this.builder.get(id);

    if (!entity) {
      return null;
    }

    return entity.serialize() as TextDTO;
  }

  async list(params: ListParams): Promise<TextDTO[]> {
    const entities = await this.builder.list(params);

    return entities.map((entity: AbstractEntity) => entity.serialize() as TextDTO);
  }

  update(data: TextDTO): Promise<boolean> {
    return this.builder.update(this.convertDTOtoEntity(data));
  }

  convertDTOtoEntity(dto: Omit<TextDTO, 'id'>): AbstractEntity {
    const entity = createEntity(this.type as EntityType);

    entity.unSerializeToEntity((dto as unknown) as CommonDTO);

    entity.validate();

    return entity;
  }
}
