import { TextDTO } from 'backend';

import { IDTOConverter } from '../../domain/DTOConverter/IDTOConverter';
import { AbstractEntity } from '../../domain/entities/AbstractEntity/AbstractEntity';
import { CommonDTO } from '../../domain/entities/interface';
import { ListParams } from '../../domain/interface';
import { AbstractConstructor } from '../../domain/rulles/Constructors/AbstractConstructor/AbstractConstructor';
import { ICommonController } from '../interface';

export class Controller implements ICommonController {
  protected readonly builder: AbstractConstructor;
  private readonly converter: IDTOConverter;

  constructor(builder: AbstractConstructor, converter: IDTOConverter) {
    this.builder = builder;
    this.converter = converter;
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

  convertDTOtoEntity(dto: Omit<CommonDTO, 'id'>): AbstractEntity {
    const entity = this.converter.toEntity(dto as CommonDTO);

    entity.validate();

    return entity;
  }
}
