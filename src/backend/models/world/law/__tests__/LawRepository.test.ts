import { MOCKED_RESULT_SET } from '@mocks/mockedResultSet';
import { MOCKED_LAW } from '@mocks/mockedWorld';

import { IAbstractModel } from '../../../../base/abstractModel';
import DbClient from '../../../../base/dbClient';
import { ErrorLog } from '../../../../base/errors/errorLog';
import { LawModel } from '../lawModel';
import { LawRepository } from '../lawRepository';

describe('WHEN "LawRepository" is provided', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const errorLogMock = new ErrorLog();
  const lawRepository = new LawRepository();
  const addErrorMock = jest.spyOn(errorLogMock, 'add');
  const law = new LawModel(MOCKED_LAW);

  beforeEach(() => {
    Object.defineProperty(lawRepository, '_errorLog', {
      writable: true,
      value: errorLogMock,
    });

    executeMock.mockResolvedValue([MOCKED_RESULT_SET]);
    addErrorMock.mockReturnValue();

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
