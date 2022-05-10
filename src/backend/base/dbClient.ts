import { enablePromise, openDatabase, ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

export class DbClient {
  static DATABASE_NAME = 'PLOT_TWIST';

  async execute(query: string): Promise<[ResultSet]> {
    const db = await this._connect();

    return db.executeSql(query);
  }

  async createTable(query: string): Promise<boolean> {
    const db = await this._connect();

    await db.executeSql(query);

    return true;
  }

  iterate<T>(results: [ResultSet]): Set<T> {
    const items: Set<T> = new Set<T>();

    results.forEach((result: ResultSet) => {
      for (let index = 0; index < result.rows.length; index++) {
        items.add(result.rows.item(index));
      }
    });

    return items;
  }

  _connect(): Promise<SQLiteDatabase> {
    return openDatabase({ name: DbClient.DATABASE_NAME, location: 'default' });
  }
}

export default new DbClient();
