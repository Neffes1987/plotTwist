import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ListParams } from '../../../domain/interface';
import { RawDataType } from '../../../domain/repositories/Repository/interface';
import { AbstractDataAccessProvider } from '../AbstractDataAccessProvider/AbstractDataAccessProvider';
import { DataStoreSchema } from '../interface';

export class AsyncStoreProvider extends AbstractDataAccessProvider {
  static data: DataStoreSchema = {
    world: [],
    plot: [],
    laws: [],
    worldLawRelation: [],
  };

  constructor(entityName: string) {
    super(entityName);

    if (this.schema.length === 0) {
      this.readFromStore();
    }
  }

  get schema(): RawDataType[] {
    if (!AsyncStoreProvider.data[this.entityName]) {
      this.setSchema([]);
    }

    return AsyncStoreProvider.data[this.entityName];
  }

  setSchema(newSchemaData: RawDataType[]): void {
    AsyncStoreProvider.data[this.entityName] = newSchemaData;
  }

  async create(entity: RawDataType): Promise<string> {
    entity.id = uuid.v4().toString();
    this.setSchema([...this.schema, entity]);

    await this.writeToStore();

    return entity.id;
  }

  async delete(entityId: string): Promise<boolean> {
    this.setSchema(this.schema.filter(({ id }) => entityId !== id));

    await this.writeToStore();

    return true;
  }

  get(entityId: string): Promise<Nullable<RawDataType>> {
    const record = this.schema.find(({ id }) => entityId === id);

    return Promise.resolve(record ?? null);
  }

  async update(entity: RawDataType): Promise<boolean> {
    await this.delete(entity.id);
    this.setSchema([...this.schema, entity]);
    await this.writeToStore();

    return true;
  }

  list(params: ListParams): Promise<RawDataType[]> {
    const { queryParams = {}, pagination } = params;
    const records: RawDataType[] = [];
    const fieldKeys = Object.keys(queryParams);

    this.schema.filter(record => {
      let isSatisfied = true;

      for (const fieldKey of fieldKeys) {
        const queryParamValue = queryParams[fieldKey];
        const recordValue = record[fieldKey];

        if (Array.isArray(queryParamValue)) {
          if (!queryParams[fieldKey].includes(`${recordValue}`)) {
            isSatisfied = false;

            break;
          }
        } else {
          if (recordValue !== queryParamValue) {
            isSatisfied = false;

            break;
          }
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
    return AsyncStorage.setItem(this.entityName, JSON.stringify(this.schema));
  }

  private async readFromStore(): Promise<void> {
    const value = await AsyncStorage.getItem(this.entityName);

    if (value) {
      this.setSchema(JSON.parse(value) ?? []);
    }
  }
}
