import { IAbstractModel } from '@backend';
import { MOCKED_RESULT } from '@mocks/mockedCharacter';

import DbClient from '../../../../base/dbClient';
import { ResultModel } from '../resultModel';
import { ResultRepository } from '../resultRepository';

describe('ResultRepository', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const repository = new ResultRepository();
  const model = new ResultModel(MOCKED_RESULT);

  beforeEach(() => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: (): IAbstractModel => MOCKED_RESULT,
          raw: jest.fn(),
          length: 1,
        },
        rowsAffected: 0,
      },
    ]);
  });

  describe('WHEN "list" is called', () => {
    it('MUST send query to db', async () => {
      await repository.list({ page: 1, limit: 1 });

      expect(executeMock).toHaveBeenCalledWith(repository.generateSelectQuery('', 1, 1));
    });

    it('MUST return array of results', async () => {
      expect(await repository.list({ page: 1, limit: 1 })).toEqual([model]);
    });
  });

  it('WHEN "generateModel" is called, MUST return "result" model', () => {
    expect(repository.generateModel(MOCKED_RESULT)).toEqual(model);
  });

  it('WHEN "getDbTableColumns" is called, MUST return list of columns', () => {
    expect(repository.getDbTableColumns()).toEqual({
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
    });
  });
});
