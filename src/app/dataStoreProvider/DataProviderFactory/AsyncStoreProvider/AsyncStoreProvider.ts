import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ListParams } from '../../../domain/interface';
import { RawDataType } from '../../../domain/repositories/AbstractRepository/interface';
import { AbstractDataAccessProvider } from '../AbstractDataAccessProvider/AbstractDataAccessProvider';

export class AsyncStoreProvider extends AbstractDataAccessProvider {
  static data: RawDataType[] = [];

  constructor(entityName: string) {
    super(entityName);

    if (AsyncStoreProvider.data.length === 0) {
      this.readFromStore();
    }
  }

  async create(entity: RawDataType): Promise<string> {
    entity.id = uuid.v4().toString();
    AsyncStoreProvider.data.push(entity);
    await this.writeToStore();

    return entity.id;
  }

  async delete(entityId: string): Promise<boolean> {
    AsyncStoreProvider.data = AsyncStoreProvider.data.filter(({ id }) => entityId !== id);
    await this.writeToStore();

    return true;
  }

  get(entityId: string): Promise<Nullable<RawDataType>> {
    const record = AsyncStoreProvider.data.find(({ id }) => entityId === id);

    return Promise.resolve(record ?? null);
  }

  async update(entity: RawDataType): Promise<boolean> {
    await this.delete(entity.id as string);
    AsyncStoreProvider.data.push(entity);
    await this.writeToStore();

    return true;
  }

  list(params: ListParams): Promise<RawDataType[]> {
    const { queryParams = {}, pagination } = params;
    const records: RawDataType[] = [];
    const fieldKeys = Object.keys(queryParams);

    AsyncStoreProvider.data.filter(record => {
      let isSatisfied = true;

      for (const fieldKey of fieldKeys) {
        if (record[fieldKey] === queryParams[fieldKey]) {
          isSatisfied = false;

          break;
        }
      }

      if (isSatisfied) {
        records.push(record);
      }
    });

    const { count = 25, page = 1 } = pagination;

    return Promise.resolve(records.slice(count * (page - 1), count));
  }

  private writeToStore(): Promise<void> {
    return AsyncStorage.setItem(this.entityName, JSON.stringify(AsyncStoreProvider.data));
  }

  private readFromStore(): void {
    AsyncStorage.getItem(this.entityName)
      .then((value: Nullable<string>) => {
        if (value) {
          AsyncStoreProvider.data = JSON.parse(value);
        }
      })
      .catch((e: Error) => {
        console.error(e);
      });
  }
}
