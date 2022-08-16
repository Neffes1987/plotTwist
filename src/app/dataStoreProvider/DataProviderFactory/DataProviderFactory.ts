import { IDataProvider } from '../../domain/repositories/AbstractRepository/interface';

import { AsyncStoreProvider } from './AsyncStoreProvider/AsyncStoreProvider';
import { DBProvider } from './DBProvider/DBProvider';
import { DataProviderType } from './interface';

export class DataProviderFactory {
  private readonly entityName: string;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  createDataProvider(type: DataProviderType): IDataProvider {
    switch (type) {
      case 'db':
        return new DBProvider(this.entityName);
      case 'store':
        return new AsyncStoreProvider(this.entityName);
      default:
        throw new Error('Wrong provider type');
    }
  }
}
