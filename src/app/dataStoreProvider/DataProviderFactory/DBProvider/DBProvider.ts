import { ListParams } from '../../../domain/interface';
import { RawDataType } from '../../../domain/repositories/AbstractRepository/interface';
import { AbstractDataAccessProvider } from '../AbstractDataAccessProvider/AbstractDataAccessProvider';

export class DBProvider extends AbstractDataAccessProvider {
  constructor(entityName: string) {
    super(entityName);
  }

  create(entity: RawDataType): Promise<string> {
    return Promise.resolve('');
  }

  delete(entityId: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  get(entityId: string): Promise<RawDataType> {
    return Promise.resolve({} as RawDataType);
  }

  update(entity: RawDataType): Promise<boolean> {
    return Promise.resolve(true);
  }

  list(params: ListParams): Promise<RawDataType[]> {
    return Promise.resolve([]);
  }
}
