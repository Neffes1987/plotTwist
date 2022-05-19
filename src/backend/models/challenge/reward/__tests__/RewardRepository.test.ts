import { MOCKED_REWARD } from '@mocks/mockedChallenge';

import { IAbstractModel } from '../../../../base/abstractModel';
import DbClient from '../../../../base/dbClient';
import { RewardModel } from '../rewardModel';
import { RewardRepository } from '../rewardRepository';

describe('RewardRepository', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const repository = new RewardRepository();
  const model = new RewardModel(MOCKED_REWARD);

  beforeEach(() => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: (): IAbstractModel => MOCKED_REWARD,
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

    it('MUST return array of rewards', async () => {
      expect(await repository.list({ page: 1, limit: 1 })).toEqual([model]);
    });
  });

  it('WHEN "generateModel" is called, MUST return "reward" model', () => {
    expect(repository.generateModel(MOCKED_REWARD)).toEqual(model);
  });

  it('WHEN "getDbTableColumns" is called, MUST return list of columns', () => {
    expect(repository.getDbTableColumns()).toEqual({
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      challengeId: 'TEXT',
    });
  });
});
