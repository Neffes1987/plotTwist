import { CommonDTO } from 'backend';

import { AbstractEntity } from '../../domain/entities/AbstractEntity/AbstractEntity';
import { ListParams } from '../../domain/interface';
import { AbstractConstructor } from '../../domain/rulles/Constructors/AbstractConstructor/AbstractConstructor';
import { ICommonController } from '../interface';

export abstract class AbstractController<Get extends CommonDTO, Update extends CommonDTO> implements ICommonController<Get, Update> {
  private readonly builder: AbstractConstructor;

  protected constructor(builder: AbstractConstructor) {
    this.builder = builder;
  }

  create(data: Omit<Update, 'id'>): Promise<string> {
    return this.builder.create(this.convertDTOtoEntity(data));
  }

  delete(id: string): Promise<boolean> {
    return this.builder.delete(id);
  }

  async get(id: string): Promise<Nullable<Get>> {
    const entity = await this.builder.get(id);

    if (!entity) {
      return null;
    }

    return entity.serialize() as Get;
  }

  async list(params: ListParams): Promise<Get[]> {
    const entities = await this.builder.list(params);

    return entities.map((entity: AbstractEntity) => entity.serialize() as Get);
  }

  update(data: Update): Promise<boolean> {
    return this.builder.update(this.convertDTOtoEntity(data));
  }

  abstract convertDTOtoEntity(dto: Omit<Update, 'id'>): AbstractEntity;
}
