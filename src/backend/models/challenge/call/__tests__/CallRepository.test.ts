import { MOCKED_CALL } from '@mocks/mockedChallenge';

import { IAbstractModel } from '../../../../base/abstractModel';
import DbClient from '../../../../base/dbClient';
import { CallModel } from '../callModel';
import { CallRepository } from '../callRepository';

describe('CallRepository', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const repository = new CallRepository();
  const model = new CallModel(MOCKED_CALL);

  beforeEach(() => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: (): IAbstractModel => MOCKED_CALL,
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

    it('MUST return array of calls', async () => {
      expect(await repository.list({ page: 1, limit: 1 })).toEqual([model]);
    });
  });

  it('WHEN "generateModel" is called, MUST return "call" model', () => {
    expect(repository.generateModel(MOCKED_CALL)).toEqual(model);
  });

  it('WHEN "getDbTableColumns" is called, MUST return list of columns', () => {
    expect(repository.getDbTableColumns()).toEqual({
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      partyMotivation: 'TEXT',
      challengeId: 'TEXT',
      status: 'TEXT',
      type: 'TEXT',
    });
  });
});
