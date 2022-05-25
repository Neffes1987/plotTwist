import { v4 as uuidv4 } from 'uuid';

import { AbstractModel } from './abstractModel';
import dbClient, { DbClient } from './dbClient';
import { ErrorLog, UnexpectedErrorCode } from './errors/errorLog';
import { UxException } from './errors/uxException';
import { ColumnsConfigType, IAbstractModel, IListQuery } from './interface';

export abstract class AbstractRepository<Model extends AbstractModel> {
  private readonly _tableName;
  private readonly _items;
  private readonly _errorLog;
  private readonly _dbClient;

  protected constructor(tableName: string) {
    this._tableName = tableName;
    this._errorLog = new ErrorLog();
    this._items = new Map();
    this._dbClient = dbClient;

    const config = this.getDbTableColumns();
    const columnsAttr: string[] = ['primaryKey INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'];

    Object.keys(config).forEach((columnName: string) => {
      let columnSettings = config[columnName];

      if (['ARRAY', 'BOOLEAN'].includes(columnSettings)) {
        // SQL lite does not support array and boolean data type
        columnSettings = 'TEXT';
      }

      columnsAttr.push(`${columnName} ${columnSettings}`);
    });

    this.db.execute(`CREATE TABLE IF NOT EXISTS "${this.tableName}" (${columnsAttr.toString()})`);
  }

  get db(): DbClient {
    return this._dbClient;
  }

  get tableName(): string {
    return this._tableName;
  }

  get errorLog(): ErrorLog {
    return this._errorLog;
  }

  get cacheCount(): number {
    return this._items.size;
  }

  generateModelId(model: AbstractModel): void {
    if (!model.id) {
      model.setId(uuidv4());
    }
  }

  async get(id: string): Promise<Nullable<Model>> {
    const model = this._items.get(id);

    if (model) {
      return model;
    }

    const result = await this.dbFind(id);

    if (!result) {
      return null;
    }

    this._items.set(id, result);

    return result;
  }

  async getList<T extends IListQuery>(query: T): Promise<Model[]> {
    const results = await this.doListQuery(query);

    for (const result of results) {
      this._items.set(result.id, result);
    }

    return results;
  }

  async add(model: Model): Promise<string> {
    this.generateModelId(model);
    await this.dbCreate(model);
    this._items.set(model.id, model);

    return model.id;
  }

  async replace(model: Model): Promise<boolean> {
    await this.dbUpdate(model);
    this._items.set(model.id, model);

    return true;
  }

  async remove(id: string): Promise<boolean> {
    const success = await this.dbDelete(id);

    this._items.delete(id);

    return success;
  }

  generateDeleteQuery(where: string): string {
    return `DELETE
            FROM ${this.tableName}
            WHERE ${where}`;
  }

  generateSelectQuery(where: string, page: IListQuery['page'] = 0, limit: IListQuery['limit'] = 10, order: IListQuery['order'] = 'DESC'): string {
    const offset = page * limit;

    return `SELECT * FROM ${this.tableName} ${where.length ? `WHERE ${where}` : ''} LIMIT ${limit} OFFSET ${offset} ORDER BY ${order}`;
  }

  generateCreateQuery(record: Record<string, string | number>): string {
    const columns: (string | number)[] = [];
    const values: (string | number)[] = [];

    Object.keys(record).forEach((columnName: string) => {
      values.push(`'${record[columnName] ?? 'NULL'}'`);
      columns.push(columnName);
    });

    return `INSERT INTO ${this.tableName} (${columns.toString()})
            VALUES (${values.toString()})`;
  }

  generateUpdateQuery(record: Record<string, string | number>, where: string): string {
    const values: (string | number)[] = [];

    Object.keys(record).forEach((columnName: string) => {
      values.push(`${columnName}='${record[columnName] ?? 'NULL'}'`);
    });

    return `UPDATE ${this.tableName}
            SET ${values.toString()}
            WHERE ${where})`;
  }

  async dbFind(id: string): Promise<Nullable<Model>> {
    try {
      const result = await this.db.execute(this.generateSelectQuery(`id='${id}'`, 0, 1));

      const resultItems = this.db.iterate<Model>(result);

      if (resultItems.length === 0) {
        return null;
      }

      return this.generateModel(this.formatDataByColumnsType(resultItems[0])) ?? null;
    } catch (e) {
      this.errorLog.add(e);
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.canNotFindItemById);
    }
  }

  async dbDelete(id: string): Promise<boolean> {
    try {
      await this.db.execute(this.generateDeleteQuery(`id='${id}'`));
    } catch (e) {
      this.errorLog.add(e);
      throw new UxException('can_not_delete_item_by_id');
    }

    return true;
  }

  async dbUpdate(model: Model): Promise<boolean> {
    try {
      await this.db.execute(this.generateUpdateQuery(this.generateRecordByColumns(model), `id='${model.id}'`));
    } catch (e) {
      this.errorLog.add(e);
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.canNotUpdateItemByProvidedData);
    }

    return true;
  }

  async dbCreate(model: Model): Promise<boolean> {
    try {
      await this.db.execute(this.generateCreateQuery(this.generateRecordByColumns(model)));
    } catch (e) {
      this.errorLog.add(e);
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.canNotCreateItemByProvidedData);
    }

    return true;
  }

  async doListQuery(query: IListQuery): Promise<Model[]> {
    const { page, limit, order, ...rest } = query;
    let where = '';

    Object.keys(rest).forEach((propertyName: string) => {
      if (!rest[propertyName]) {
        return;
      }

      if (where.length > 0) {
        where += ' AND ';
      }

      where += `${propertyName}='${rest[propertyName]}'`;
    });

    try {
      const result = await this.db.execute(this.generateSelectQuery(where, page, limit, order));
      const resultItems = this.db.iterate<IAbstractModel>(result);

      return resultItems.map((data: IAbstractModel) => this.generateModel(this.formatDataByColumnsType(data)));
    } catch (e) {
      this.errorLog.add(e);
      throw this.errorLog.formatUnexpectedError(UnexpectedErrorCode.canNotGetListByQuery);
    }
  }

  generateRecordByColumns(model: Model): Record<string, string | number> {
    const result = {};
    const serializedModel = model.serialize();
    const columns = this.getDbTableColumns();

    Object.keys(columns).forEach((columnName: string) => {
      const value = serializedModel[columnName];
      const columnType = columns[columnName];

      if (columnType === 'ARRAY') {
        result[columnName] = value?.toString() ?? '';

        return;
      }

      if (columnType === 'BOOLEAN') {
        result[columnName] = value?.toString() ?? 'false';

        return;
      }

      result[columnName] = serializedModel[columnName] ?? 'NULL';
    });

    return result;
  }

  formatDataByColumnsType<T extends IAbstractModel>(record: T): T {
    const result = {} as T;
    const columns = this.getDbTableColumns();

    Object.keys(columns).forEach((columnName: string) => {
      const columnValue = record[columnName];
      const columnType = columns[columnName];

      if (columnType === 'ARRAY') {
        result[columnName] = columnValue ? `${columnValue}`.split(',') : [];

        return;
      }

      if (columnType === 'BOOLEAN') {
        result[columnName] = `${columnValue || 'false'}` !== 'false';

        return;
      }

      if (columnType === 'TEXT' && columnValue === 'NULL') {
        result[columnName] = undefined;

        return;
      }

      if (columnType === 'INTEGER' && columnValue === 'NULL') {
        result[columnName] = undefined;

        return;
      }

      result[columnName] = columnValue;
    });

    return result;
  }

  abstract getDbTableColumns(): Record<string, ColumnsConfigType>;

  abstract generateModel(data: IAbstractModel): Model;
}
