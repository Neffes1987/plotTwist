import { enablePromise, openDatabase, ResultSet, ResultSetRowList } from 'react-native-sqlite-storage';

import { DbClient } from '../dbClient';

jest.mock('react-native-sqlite-storage');

describe('DbClient', () => {
  const openDBMock = openDatabase as jest.Mock;
  const enablePromiseMock = enablePromise as jest.Mock;
  const dbClient = new DbClient();
  const executeSqlMock = jest.fn();
  const itemMock = jest.fn();
  const rows: ResultSetRowList = {
    length: 1,
    item: itemMock,
    raw: jest.fn(),
  };

  const result: ResultSet = {
    insertId: 0,
    rows,
    rowsAffected: 1,
  };

  beforeEach(() => {
    enablePromiseMock.mockReturnValue(true);

    openDBMock.mockReturnValue({
      executeSql: executeSqlMock,
    });

    executeSqlMock.mockResolvedValue([result]);
  });

  describe('WHEN "iterate" is created', () => {
    it('MUST call "item" for each record', () => {
      dbClient.iterate([result]);

      expect(result.rows.item).toHaveBeenCalledWith(0);
    });

    it('MUST returns items set', () => {
      const testItem = {
        id: '0',
      };

      itemMock.mockReturnValue(testItem);

      expect(dbClient.iterate([result])).toEqual([testItem]);
    });
  });

  describe('WHEN "execute" is called', () => {
    const query = 'UPDATE TABLE "table_name"';

    it('MUST open "db"', async () => {
      await dbClient.execute(query);

      expect(openDBMock).toHaveBeenCalledWith({ name: DbClient.DATABASE_NAME, location: 'default' });
    });

    it('MUST send transaction to "db"', async () => {
      await dbClient.execute(query);

      expect(executeSqlMock).toHaveBeenCalledWith(query);
    });

    it('MUST returns transaction result', async () => {
      expect(await dbClient.execute(query)).toEqual([result]);
    });
  });

  describe('WHEN "createTable" is called', () => {
    const query = 'CREATE TABLE "table_name"';

    it('MUST open "db"', async () => {
      await dbClient.createTable(query);

      expect(openDBMock).toHaveBeenCalledWith({ name: DbClient.DATABASE_NAME, location: 'default' });
    });

    it('MUST send transaction to "db"', async () => {
      await dbClient.createTable(query);

      expect(executeSqlMock).toHaveBeenCalledWith(query);
    });

    it('MUST returns boolean value', async () => {
      expect(await dbClient.createTable(query)).toBeTruthy();
    });
  });
});
