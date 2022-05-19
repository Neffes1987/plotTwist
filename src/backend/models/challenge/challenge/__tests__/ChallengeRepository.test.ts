import { MOCKED_CHALLENGE, MOCKED_EDGE, MOCKED_MAIN_EDGE } from '@mocks/mockedChallenge';

import DbClient from '../../../../base/dbClient';
import { ChallengeModel } from '../challengeModel';
import { ChallengeRepository } from '../challengeRepository';
import { EdgeModel } from '../edgeModel';
import { MainEdgeModel } from '../mainEdgeModel';

describe('CharacterRepository', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const repository = new ChallengeRepository();
  const challenge = new ChallengeModel(MOCKED_CHALLENGE);
  const edge = new EdgeModel(MOCKED_EDGE);
  const mainEdge = new MainEdgeModel(MOCKED_MAIN_EDGE);

  beforeEach(() => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: ((): (() => Record<string, string | number>) => {
            const models = [
              repository.generateRecordByColumns(edge),
              repository.generateRecordByColumns(challenge),
              repository.generateRecordByColumns(mainEdge),
            ];
            let iteration = 0;

            return (): Record<string, string | number> => {
              const result = models[iteration];

              iteration += 1;

              return result;
            };
          })(),
          raw: jest.fn(),
          length: 3,
        },
        rowsAffected: 0,
      },
    ]);
  });

  describe('WHEN "list" is called', () => {
    it('MUST send query to db', async () => {
      await repository.list({ page: 1, limit: 10 });

      expect(executeMock).toHaveBeenCalledWith(repository.generateSelectQuery('', 1, 10));
    });

    it('MUST return array of characters', async () => {
      expect(await repository.list({ page: 1, limit: 10 })).toEqual([edge, challenge, mainEdge]);
    });
  });

  it('WHEN "getDbTableColumns" is called, MUST return list of columns', () => {
    expect(repository.getDbTableColumns()).toEqual({
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      callIds: 'ARRAY',
      characterIds: 'ARRAY',
      brokenLawIds: 'ARRAY',
      plotGoal: 'TEXT',
      rewardId: 'TEXT',
      weight: 'TEXT',
      type: 'TEXT',
      isActive: 'BOOLEAN',
      guardId: 'TEXT',
      challengeIds: 'ARRAY',
      edgeImpact: 'TEXT',
      mainEdgeType: 'TEXT',
      shadowEncounterType: 'TEXT',
      heartCrisis: 'TEXT',
    });
  });

  describe('WHEN "generateRecordByColumns" is called', () => {
    it.each([
      ['challenge', MOCKED_CHALLENGE, challenge],
      ['edge', MOCKED_EDGE, edge],
      ['mainEdge', MOCKED_MAIN_EDGE, mainEdge],
    ])('AND provided data is for %p, MUST fill columns for provided type', (_, expected, model) => {
      const expectedAnswer = {};
      const columns = repository.getDbTableColumns();

      Object.keys(columns).forEach((columnName: string) => {
        const columnType = columns[columnName];

        if (columnType === 'ARRAY') {
          expectedAnswer[columnName] = (expected[columnName] ?? []).toString();

          return;
        }

        if (columnType === 'BOOLEAN') {
          expectedAnswer[columnName] = (expected[columnName] ?? false).toString();

          return;
        }

        expectedAnswer[columnName] = expected[columnName] ?? 'NULL';
      });

      expect(repository.generateRecordByColumns(model)).toEqual(expectedAnswer);
    });
  });

  describe('WHEN "getEdgeByChallengeId" is called', () => {
    it('MUST send request to db', async () => {
      await repository.getEdgeByChallengeId(challenge.id);

      expect(executeMock).toHaveBeenCalledWith(repository.generateSelectQuery(`type IN ('edge', 'mainEdge') AND challengeIds LIKE '%${challenge.id}%'`, 0, 1));
    });

    it('MUST return edge', async () => {
      expect(await repository.getEdgeByChallengeId(challenge.id)).toEqual(edge);
    });
  });

  describe('WHEN "generateModel" is called', () => {
    it.each([
      ['challenge', MOCKED_CHALLENGE, challenge],
      ['edge', MOCKED_EDGE, edge],
      ['mainEdge', MOCKED_MAIN_EDGE, mainEdge],
    ])('AND type is %p, MUST return "character" model by provided type', (type, providedData, expectedModel) => {
      expect(repository.generateModel(providedData)).toEqual(expectedModel);
    });
  });
});
