import { AbstractEntity } from '../../entities/AbstractEntity/AbstractEntity';
import { ListParams } from '../../interface';
import { IRepository } from '../../rulles/Constructors/AbstractConstructor/interface';

import { IDataProvider, RawDataType } from './interface';

export abstract class AbstractRepository implements IRepository {
  protected dataProvider: IDataProvider;

  protected constructor(dataProvider: IDataProvider) {
    this.dataProvider = dataProvider;
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

  private serializeEntity(entity: AbstractEntity): RawDataType {
    return (entity.serialize() as unknown) as RawDataType;
  }

  protected abstract unSerializeToEntity(object: RawDataType): AbstractEntity;
}
