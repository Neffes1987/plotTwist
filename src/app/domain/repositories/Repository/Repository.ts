import { AbstractEntity } from '../../entities/AbstractEntity/AbstractEntity';
import { createEntity } from '../../entities/createEntity';
import { EntityType } from '../../entities/interface';
import { ListParams } from '../../interface';
import { IRepository } from '../../rulles/Constructors/AbstractConstructor/interface';

import { IDataProvider, RawDataType } from './interface';

export class Repository implements IRepository {
  protected dataProvider: IDataProvider;
  protected type?: EntityType;

  constructor(dataProvider: IDataProvider, type?: EntityType) {
    this.dataProvider = dataProvider;
    this.type = type;
  }

  delete(entityId: string): Promise<boolean> {
    return this.dataProvider.delete(entityId);
  }

  create(entity: AbstractEntity): Promise<string> {
    return this.dataProvider.create(this.serializeEntity(entity));
  }

  async list(params: ListParams): Promise<AbstractEntity[]> {
    const result = await this.dataProvider.list(params);

    return result.map(record => this.unSerializeToEntity(record));
  }

  async get(entityId: string): Promise<Nullable<AbstractEntity>> {
    const result = await this.dataProvider.get(entityId);

    if (!result) {
      return null;
    }

    return this.unSerializeToEntity(result);
  }

  update(entity: AbstractEntity): Promise<boolean> {
    return this.dataProvider.update(this.serializeEntity(entity));
  }

  protected unSerializeToEntity(object: RawDataType): AbstractEntity {
    if (!this.type) {
      throw new Error('ENTITY_TYPE_IS_NOT_PROVIDED');
    }

    const entity = createEntity(this.type);

    entity.unSerializeToEntity(object);

    return entity;
  }

  private serializeEntity(entity: AbstractEntity): RawDataType {
    return (entity.serialize() as unknown) as RawDataType;
  }
}
