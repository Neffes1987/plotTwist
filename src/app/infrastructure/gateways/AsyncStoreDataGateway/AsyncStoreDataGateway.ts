import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStoreDataGateway<DTO extends CommonEntityDTO> implements DataStoreGateway<DTO> {
  private readonly entityName: string;
  private data: Record<string, DTO> = {};

  constructor(entityName: string) {
    this.entityName = `entity-${entityName}`;
  }

  async save(entity: DTO): Promise<string> {
    await this.readFromStore();

    if (!entity.id) {
      entity.id = uuid.v4().toString();
    }

    this.data[entity.id] = entity;

    await this.writeToStore();

    return entity.id;
  }

  async saveInBatch(entities: DTO[]): Promise<boolean> {
    await this.readFromStore();

    entities.forEach(entity => {
      if (!entity.id) {
        entity.id = uuid.v4().toString();
      }

      this.data[entity.id] = entity;
    });

    await this.writeToStore();

    return true;
  }

  async delete(entityId: string): Promise<boolean> {
    await this.readFromStore();
    this.data = { ...this.data, [entityId]: undefined } as Record<string, DTO>;

    await this.writeToStore();

    return true;
  }

  async deleteButch(entityIds: string[]): Promise<boolean> {
    await this.readFromStore();

    entityIds.forEach(entityId => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.data[entityId];
    });

    await this.writeToStore();

    return true;
  }

  async get(entityId: string): Promise<Nullable<DTO>> {
    await this.readFromStore();

    const record = this.data[entityId];

    return Promise.resolve(record ?? null);
  }

  async list(params: ListParams<DTO>): Promise<DTO[]> {
    await this.readFromStore();

    const { query = {} } = params;
    const records: DTO[] = [];
    const fieldKeys = Object.keys(query);

    Object.values(this.data)?.filter(record => {
      let isSatisfied = true;

      for (const fieldKey of fieldKeys) {
        const queryParamValue = query[fieldKey];
        const recordValue = record[fieldKey];

        if (Array.isArray(queryParamValue)) {
          if (!query[fieldKey].includes(`${recordValue}`)) {
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

    return Promise.resolve(records);
  }

  private writeToStore(): Promise<void> {
    return AsyncStorage.setItem(this.entityName, JSON.stringify(this.data));
  }

  private async readFromStore(): Promise<void> {
    if (Object.keys(this.data).length) {
      return;
    }

    const value = await AsyncStorage.getItem(this.entityName);

    this.data = value ? JSON.parse(value) : {};
  }
}
