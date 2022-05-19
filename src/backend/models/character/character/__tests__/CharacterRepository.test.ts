import { MOCKED_ALLY, MOCKED_ENEMY, MOCKED_GUARD, MOCKED_MENTOR, MOCKED_MESSENGER, MOCKED_SHADOW } from '@mocks/mockedCharacter';

import DbClient from '../../../../base/dbClient';
import { AllyModel } from '../allyModel';
import { CharacterRepository } from '../characterRepository';
import { EnemyModel } from '../enemyModel';
import { GuardModel } from '../guardModel';
import { MentorModel } from '../mentorModel';
import { MessengerModel } from '../messengerModel';
import { ShadowModel } from '../shadowModel';

describe('CharacterRepository', () => {
  const executeMock = jest.spyOn(DbClient, 'execute');
  const repository = new CharacterRepository();
  const ally = new AllyModel(MOCKED_ALLY);
  const enemy = new EnemyModel(MOCKED_ENEMY);
  const guard = new GuardModel(MOCKED_GUARD);
  const mentor = new MentorModel(MOCKED_MENTOR);
  const messenger = new MessengerModel(MOCKED_MESSENGER);
  const shadow = new ShadowModel(MOCKED_SHADOW);

  beforeEach(() => {
    executeMock.mockResolvedValue([
      {
        insertId: 0,
        rows: {
          item: ((): (() => Record<string, string | number>) => {
            const models = [
              repository.generateRecordByColumns(ally),
              repository.generateRecordByColumns(enemy),
              repository.generateRecordByColumns(guard),
              repository.generateRecordByColumns(mentor),
              repository.generateRecordByColumns(messenger),
              repository.generateRecordByColumns(shadow),
            ];
            let iteration = 0;

            return (): Record<string, string | number> => {
              const result = models[iteration];

              iteration += 1;

              return result;
            };
          })(),
          raw: jest.fn(),
          length: 6,
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

    it('MUST return array of characters', async () => {
      expect(await repository.list({ page: 1, limit: 1 })).toEqual([ally, enemy, guard, mentor, messenger, shadow]);
    });
  });

  describe('WHEN "generateModel" is called', () => {
    it.each([
      ['ally', MOCKED_ALLY, ally],
      ['enemy', MOCKED_ENEMY, enemy],
      ['guard', MOCKED_GUARD, guard],
      ['mentor', MOCKED_MENTOR, mentor],
      ['messenger', MOCKED_MESSENGER, messenger],
      ['shadow', MOCKED_SHADOW, shadow],
    ])('AND type is %p, MUST return "character" model by provided type', (type, providedData, expectedModel) => {
      expect(repository.generateModel(providedData)).toEqual(expectedModel);
    });
  });

  describe('WHEN "generateRecordByColumns" is called', () => {
    it.each([
      ['ally', MOCKED_ALLY, ally],
      ['enemy', MOCKED_ENEMY, enemy],
      ['guard', MOCKED_GUARD, guard],
      ['mentor', MOCKED_MENTOR, mentor],
      ['messenger', MOCKED_MESSENGER, messenger],
      ['shadow', MOCKED_SHADOW, shadow],
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

  it('WHEN "getDbTableColumns" is called, MUST return list of columns', () => {
    expect(repository.getDbTableColumns()).toEqual({
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      plotId: 'TEXT',
      age: 'TEXT',
      race: 'TEXT',
      gender: 'TEXT',
      goal: 'TEXT',
      previewId: 'TEXT',
      profession: 'TEXT',
      group: 'TEXT',
      type: 'TEXT',
      strongest: 'ARRAY',
      weakness: 'ARRAY',
      resultIds: 'ARRAY',
      rewardId: 'TEXT',
      motivation: 'TEXT',
      possibleToMoveAlly: 'TEXT',
      becameAlly: 'TEXT',
      becameEnemy: 'TEXT',
      knowledgeType: 'TEXT',
      mentorType: 'TEXT',
      waterholesIds: 'ARRAY',
      lawIds: 'ARRAY',
      callIds: 'ARRAY',
      visionOnSituation: 'TEXT',
      isAllyForParty: 'BOOLEAN',
      callForAlly: 'TEXT',
      allyType: 'TEXT',
      allyForHero: 'TEXT',
    });
  });

  describe('WHEN ""updateMessengersCalls" is called', () => {
    const expectedMessengerWithNewCalls = new MessengerModel(MOCKED_MESSENGER);
    const expectedMessengerWithEmptyCalls = new MessengerModel(MOCKED_MESSENGER);

    expectedMessengerWithNewCalls.setCallIds(['callId22', 'callId122', 'callId', 'callId1']);
    expectedMessengerWithEmptyCalls.setCallIds([]);

    it.each([
      [
        'AND provided data contains added calls',
        {
          characters: [new MessengerModel(MOCKED_MESSENGER)],
          add: {
            [messenger.id]: ['callId22', 'callId122'],
          },
        },
        expectedMessengerWithNewCalls,
      ],
      [
        'AND provided data contains removed calls',
        {
          characters: [new MessengerModel(MOCKED_MESSENGER)],
          remove: {
            [messenger.id]: ['callId', 'callId1'],
          },
        },
        expectedMessengerWithEmptyCalls,
      ],
    ])('%p, MUST send query to db for each of character', async (_, props, expectedMessenger) => {
      executeMock.mockReset();

      await repository.updateMessengersCalls(props);

      expect(executeMock).toHaveBeenCalledWith(repository.generateUpdateQuery(repository.generateRecordByColumns(expectedMessenger), `id='${messenger.id}'`));
    });

    it('MUST return boolean result', async () => {
      expect(
        await repository.updateMessengersCalls({
          characters: [messenger],
          add: {
            [messenger.id]: ['callId', 'callId1'],
          },
        }),
      ).toBeTruthy();
    });
  });

  describe('WHEN "updateMentorsLaws" is called', () => {
    const expectedMentorWithNewLaws = new MentorModel(MOCKED_MENTOR);
    const expectedMentorWithEmptyLaws = new MentorModel(MOCKED_MENTOR);

    expectedMentorWithNewLaws.setLaws(['law111']);
    expectedMentorWithEmptyLaws.setLaws([]);
    const mentor = new MentorModel(MOCKED_MENTOR);

    mentor.setLaws(['law-for-delete']);

    it.each([
      [
        'AND provided data contains added laws',
        {
          characters: [new MentorModel(MOCKED_MENTOR)],
          add: {
            [mentor.id]: ['law111'],
          },
        },
        expectedMentorWithNewLaws,
      ],
      [
        'AND provided data contains removed laws',
        {
          characters: [mentor],
          remove: {
            [mentor.id]: ['law-for-delete'],
          },
        },
        expectedMentorWithEmptyLaws,
      ],
    ])('%p, MUST send query to db for each of character', async (_, props, expectedMessenger) => {
      executeMock.mockReset();

      await repository.updateMentorsLaws(props);

      expect(executeMock).toHaveBeenCalledWith(repository.generateUpdateQuery(repository.generateRecordByColumns(expectedMessenger), `id='${mentor.id}'`));
    });

    it('MUST return boolean result', async () => {
      expect(
        await repository.updateMentorsLaws({
          characters: [new MentorModel(MOCKED_MENTOR)],
          add: {
            [mentor.id]: ['law111'],
          },
        }),
      ).toBeTruthy();
    });
  });

  describe('WHEN ""updateCharactersResults" is called', () => {
    const expectedMentorWithNewLaws = new MentorModel(MOCKED_MENTOR);
    const expectedMentorWithEmptyLaws = new MentorModel(MOCKED_MENTOR);

    expectedMentorWithNewLaws.setResultIds(['resultId']);
    expectedMentorWithEmptyLaws.setResultIds([]);
    const mentor = new MentorModel(MOCKED_MENTOR);

    mentor.setResultIds(['result-for-delete']);

    it.each([
      [
        'AND provided data contains added result',
        {
          characters: [new MentorModel(MOCKED_MENTOR)],
          add: {
            [mentor.id]: ['resultId'],
          },
        },
        expectedMentorWithNewLaws,
      ],
      [
        'AND provided data contains removed results',
        {
          characters: [mentor],
          remove: {
            [mentor.id]: ['result-for-delete'],
          },
        },
        expectedMentorWithEmptyLaws,
      ],
    ])('%p, MUST send query to db for each of character', async (_, props, expectedMessenger) => {
      executeMock.mockReset();

      await repository.updateCharactersResults(props);

      expect(executeMock).toHaveBeenCalledWith(repository.generateUpdateQuery(repository.generateRecordByColumns(expectedMessenger), `id='${mentor.id}'`));
    });

    it('MUST return boolean result', async () => {
      expect(
        await repository.updateCharactersResults({
          characters: [new MentorModel(MOCKED_MENTOR)],
          add: {
            [mentor.id]: ['law111'],
          },
        }),
      ).toBeTruthy();
    });
  });
});
