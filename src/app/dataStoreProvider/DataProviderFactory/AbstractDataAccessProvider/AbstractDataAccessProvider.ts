import { ListParams } from '../../../domain/interface';
import { IDataProvider, RawDataType } from '../../../domain/repositories/AbstractRepository/interface';

export abstract class AbstractDataAccessProvider implements IDataProvider {
  protected entityName: string;

  protected constructor(entityName: string) {
    this.entityName = entityName;
  }

  abstract create(entity: RawDataType): Promise<string>;

  abstract delete(entityId: string): Promise<boolean>;

  abstract get(entityId: string): Promise<Nullable<RawDataType>>;

  abstract update(entity: RawDataType): Promise<boolean>;

  abstract list(params: ListParams): Promise<RawDataType[]>;
}
