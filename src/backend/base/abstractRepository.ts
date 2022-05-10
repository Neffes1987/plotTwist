import { AbstractModel, IAbstractModel } from './abstractModel';
import dbClient, { DbClient } from './dbClient';
import { ErrorLog } from './errors/errorLog';

export interface IListQuery {
  page?: number;
  limit?: number;
}

export abstract class AbstractRepository<Model extends AbstractModel> {
  private readonly _tableName;
  private readonly _items;
  private readonly _errorLog;
  private readonly _dbClient;

  constructor(tableName: string) {
    this._tableName = tableName;
    this._errorLog = new ErrorLog();
    this._items = new Map();
    this._dbClient = dbClient;

    this.createDbTable();
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

  generateModelId(model: AbstractModel): void {
    if (!model.id) {
      model.setId('someID'); // TODO: implement
    }
  }

  async get(id: string): Promise<Nullable<Model>> {
    const model = this._items.get(id);

    if (model !== null) {
      return model;
    }

    const result = await this.dbFind(id);

    if (result === null) {
      return null;
    }

    this._items.set(id, result);

    return result;
  }

  async getList<T extends IListQuery>(query: T): Promise<Model[]> {
    const results = await this.dbFindAll(query);

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

  abstract createDbTable(): string;

  abstract generateModel(data: IAbstractModel): Model;

  abstract dbFind(id: string): Promise<Nullable<Model>>;

  abstract dbFindAll(query: IListQuery): Promise<Model[]>;

  abstract dbDelete(id: string): Promise<boolean>;

  abstract dbCreate(model: Model): Promise<string>;

  abstract dbUpdate(model: Model): Promise<boolean>;
}
