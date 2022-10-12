import { IDTOConverter } from '../../DTOConverter/IDTOConverter';
import { AbstractEntity } from '../../entities/AbstractEntity/AbstractEntity';
import { ListParams } from '../../interface';
import { IRepository } from '../../rulles/Constructors/AbstractConstructor/interface';

import { IDataProvider, RawDataType } from './interface';

export class Repository implements IRepository {
  protected dataProvider: IDataProvider;
  protected converter: IDTOConverter;

  constructor(dataProvider: IDataProvider, converted: IDTOConverter) {
    this.dataProvider = dataProvider;
    this.converter = converted;
  }

  delete(entityId: string): Promise<boolean> {
    return this.dataProvider.delete(entityId);
  }

  create(entity: AbstractEntity): Promise<string> {
    return this.dataProvider.create(this.serializeEntity(entity));
  }

  async list(params: ListParams): Promise<AbstractEntity[]> {
    const result = await this.dataProvider.list(params);

    return result.map(record => this.converter.toEntity(record));
  }

  async get(entityId: string): Promise<Nullable<AbstractEntity>> {
    const result = await this.dataProvider.get(entityId);

    if (!result) {
      return null;
    }

    return this.converter.toEntity(result);
  }

  update(entity: AbstractEntity): Promise<boolean> {
    return this.dataProvider.update(this.serializeEntity(entity));
  }

  private serializeEntity(entity: AbstractEntity): RawDataType {
    return (entity.serialize() as unknown) as RawDataType;
  }
}
