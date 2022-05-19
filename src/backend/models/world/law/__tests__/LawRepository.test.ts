import { MOCKED_LAW } from '@mocks/mockedWorld';

import { IAbstractModel } from '../../../../base/abstractModel';
import DbClient from '../../../../base/dbClient';
import { LawModel } from '../lawModel';
import { LawRepository } from '../lawRepository';

describe('WHEN "LawRepository" is provided', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const lawRepository = new LawRepository();
  const law = new LawModel(MOCKED_LAW);

  beforeEach(() => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: (): IAbstractModel => law,
          raw: jest.fn(),
          length: 1,
        },
        rowsAffected: 0,
      },
    ]);
  });

  it('AND "generateModel" is called, MUST return "law model"', () => {
    expect(lawRepository.generateModel(MOCKED_LAW)).toEqual(law);
  });

  it('AND "getDbTableColumns" is called', () => {
    const columns: string[] = ['primaryKey INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'];
    const config = lawRepository.getDbTableColumns();

    Object.keys(config).forEach((columnName: string) => {
      const columnSettings = config[columnName];

      columns.push(`${columnName} ${columnSettings}`);
    });

    expect(executeMock).toHaveBeenCalledWith(`CREATE TABLE IF NOT EXISTS "law" (${columns.toString()})`);
  });

  it('AND "list" is called, MUST returns list of laws', async () => {
    expect(await lawRepository.list(law.worldId)).toEqual([law]);
  });
});
