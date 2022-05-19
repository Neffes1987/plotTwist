import { MOCKED_CALL, MOCKED_MAIN_EDGE } from '@mocks/mockedChallenge';
import { MOCKED_ALLY, MOCKED_ENEMY, MOCKED_GUARD, MOCKED_MENTOR, MOCKED_MESSENGER, MOCKED_RESULT, MOCKED_SHADOW } from '@mocks/mockedCharacter';
import { MOCKED_LAW } from '@mocks/mockedWorld';

import { UxException } from '../../../base/errors/uxException';
import { ServiceMediator } from '../../../controller/serviceMediator';
import { CallModel } from '../../challenge/call/callModel';
import { ChallengeRepository } from '../../challenge/challenge/challengeRepository';
import { MainEdgeModel } from '../../challenge/challenge/mainEdgeModel';
import { LawModel } from '../../world/law/lawModel';
import { AllyModel } from '../character/allyModel';
import { CharacterRepository } from '../character/characterRepository';
import { EnemyModel } from '../character/enemyModel';
import { GuardModel } from '../character/guardModel';
import { MentorModel } from '../character/mentorModel';
import { MessengerModel } from '../character/messengerModel';
import { ShadowModel } from '../character/shadowModel';
import { ResultModel } from '../result/resultModel';
import { ResultRepository } from '../result/resultRepository';

jest.mock('../character/characterRepository');
jest.mock('../result/resultRepository');
jest.mock('../../challenge/challenge/challengeRepository');

describe('CharacterService', () => {
  const mockedCharacterRepository = new CharacterRepository();
  const mockedChallengeRepository = new ChallengeRepository();
  const mediator = new ServiceMediator();
  const mentor = new MentorModel(MOCKED_MENTOR);
  const call = new CallModel(MOCKED_CALL);
  const law = new LawModel(MOCKED_LAW);
  const result = new ResultModel(MOCKED_RESULT);
  const messenger = new MessengerModel(MOCKED_MESSENGER);

  Object.defineProperty(mediator.characterService, '_characterRepository', {
    writable: true,
    value: mockedCharacterRepository,
  });

  Object.defineProperty(mediator.challengeService, '_challengeRepository', {
    writable: true,
    value: mockedChallengeRepository,
  });

  describe('WHEN "assignCallToMessengers" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([messenger]);
    });

    it('MUST get list of "messengers" by the ids', async () => {
      await mediator.characterService.assignCallToMessenger(call.id, [messenger.id]);

      expect(mockedCharacterRepository.list).toHaveBeenCalledWith({ characterIds: [messenger.id] });
    });

    it('AND list of data is empty, MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([]);
      let error: Nullable<Error> = null;

      try {
        await mediator.characterService.assignCallToMessenger(call.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { error: 'Could not get messengers by provided ids' }));
    });

    it('AND any of data is not for "messenger", MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor, messenger]);
      let error: Nullable<Error> = null;

      try {
        await mediator.characterService.assignCallToMessenger(call.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { [mentor.id]: 'Character is not a messenger' }));
    });

    describe('AND all characters is "messengers"', () => {
      it('AND character is assigned, MUST skip "messenger" update', async () => {
        (mockedCharacterRepository.updateMessengersCalls as jest.Mock).mockReset();

        await mediator.characterService.assignCallToMessenger('callId', [messenger.id]);

        expect(mockedCharacterRepository.updateMessengersCalls).not.toHaveBeenCalled();
      });

      it('AND character is not assigned, MUST assign "messenger" to "call"', async () => {
        await mediator.characterService.assignCallToMessenger(call.id, [messenger.id]);

        expect(mockedCharacterRepository.updateMessengersCalls).toHaveBeenCalledWith({ add: { [messenger.id]: [call.id] }, characters: [messenger] });
      });
    });
  });

  describe('WHEN "unassignCallFromMessengers" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([messenger]);
    });

    it('MUST get list of "messengers" by the ids', async () => {
      await mediator.characterService.unassignCallFromMessengers(call.id, [messenger.id]);

      expect(mockedCharacterRepository.list).toHaveBeenCalledWith({ characterIds: [messenger.id] });
    });

    it('AND list of data is empty, MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([]);
      let error: Nullable<Error> = null;

      try {
        await mediator.characterService.unassignCallFromMessengers(call.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { error: 'Could not get messengers by provided ids' }));
    });

    it('AND any of data is not for "messenger", MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor, messenger]);
      let error: Nullable<Error> = null;

      try {
        await mediator.characterService.unassignCallFromMessengers(call.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { [mentor.id]: 'Character is not a messenger' }));
    });

    describe('AND all characters is "messengers"', () => {
      it('AND character is not assigned, MUST skip "messenger" update', async () => {
        const messenger = new MessengerModel(MOCKED_MESSENGER);

        messenger.setCallIds([]);

        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([messenger]);

        (mockedCharacterRepository.updateMessengersCalls as jest.Mock).mockReset();

        await mediator.characterService.unassignCallFromMessengers('callId', [messenger.id]);

        expect(mockedCharacterRepository.updateMessengersCalls).not.toHaveBeenCalled();
      });

      it('AND character is assigned, MUST unassign "messenger" to "call"', async () => {
        const messenger = new MessengerModel(MOCKED_MESSENGER);

        messenger.setCallIds([call.id]);

        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([messenger]);

        await mediator.characterService.unassignCallFromMessengers(call.id, [messenger.id]);

        expect(mockedCharacterRepository.updateMessengersCalls).toHaveBeenCalledWith({ remove: { [messenger.id]: [call.id] }, characters: [messenger] });
      });
    });
  });

  describe('WHEN "assignLawToMentors" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);
    });

    it('MUST get list of "mentors" by the ids', async () => {
      await mediator.characterService.assignLawToMentors(law.id, [mentor.id]);

      expect(mockedCharacterRepository.list).toHaveBeenCalledWith({ characterIds: [mentor.id] });
    });

    it('AND no one "mentor" found, MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([]);

      let error;

      try {
        await mediator.characterService.assignLawToMentors(law.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { error: 'Could not get mentors by provided ids' }));
    });

    it('AND any of data is not for "mentor", MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor, messenger]);
      let error;

      try {
        await mediator.characterService.assignLawToMentors(law.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { [messenger.id]: 'Character is not a messenger' }));
    });

    describe('AND all characters is "mentors"', () => {
      it('AND character is assigned, MUST skip "mentor" update', async () => {
        const mentor = new MentorModel(MOCKED_MENTOR);

        mentor.setLaws([law.id]);
        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);

        (mockedCharacterRepository.updateMentorsLaws as jest.Mock).mockReset();

        await mediator.characterService.assignLawToMentors(law.id, [mentor.id]);

        expect(mockedCharacterRepository.updateMentorsLaws).not.toHaveBeenCalled();
      });

      it('AND character is not assigned, MUST assign mentor to "law"', async () => {
        const mentor = new MentorModel(MOCKED_MENTOR);

        mentor.setLaws([]);
        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);

        (mockedCharacterRepository.updateMessengersCalls as jest.Mock).mockReset();

        await mediator.characterService.assignLawToMentors(law.id, [mentor.id]);

        expect(mockedCharacterRepository.updateMentorsLaws).toHaveBeenCalledWith({ add: { [law.id]: [mentor.id] }, characters: [mentor] });
      });
    });
  });

  describe('WHEN "unassignLawToMentors" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);
    });

    it('MUST get list of "mentors" by the ids', async () => {
      await mediator.characterService.unassignLawToMentors(law.id, [mentor.id]);

      expect(mockedCharacterRepository.list).toHaveBeenCalledWith({ characterIds: [mentor.id] });
    });

    it('AND no one "mentor" found, MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([]);

      let error;

      try {
        await mediator.characterService.unassignLawToMentors(law.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { error: 'Could not get mentors by provided ids' }));
    });

    it('AND any of data is not for "mentor", MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor, messenger]);
      let error;

      try {
        await mediator.characterService.unassignLawToMentors(law.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { [messenger.id]: 'Character is not a messenger' }));
    });

    describe('AND all characters is "mentors"', () => {
      it('AND character is unassigned, MUST skip "mentor" update', async () => {
        const mentor = new MentorModel(MOCKED_MENTOR);

        mentor.setLaws([]);

        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);

        (mockedCharacterRepository.updateMentorsLaws as jest.Mock).mockReset();

        await mediator.characterService.unassignLawToMentors(law.id, [mentor.id]);

        expect(mockedCharacterRepository.updateMentorsLaws).not.toHaveBeenCalled();
      });

      it('AND character is assigned, MUST assign mentor to "law"', async () => {
        const mentor = new MentorModel(MOCKED_MENTOR);

        mentor.setLaws([law.id]);

        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);

        await mediator.characterService.unassignLawToMentors(law.id, [mentor.id]);

        expect(mockedCharacterRepository.updateMentorsLaws).toHaveBeenCalledWith({ remove: { [law.id]: [mentor.id] }, characters: [mentor] });
      });
    });
  });

  describe('WHEN "getCharactersList" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);
    });

    it('MUST call "CharacterRepository.list"', async () => {
      await mediator.characterService.getCharactersList({ plotId: mentor.plotId });

      expect(mockedCharacterRepository.list).toHaveBeenCalledWith({ plotId: mentor.plotId });
    });
  });

  describe('WHEN "getCharacter" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.get as jest.Mock).mockResolvedValue(mentor);
    });

    it('MUST call "CharacterRepository.get"', async () => {
      await mediator.characterService.getCharacter(mentor.id);

      expect(mockedCharacterRepository.get).toHaveBeenCalledWith(mentor.id);
    });

    it('MUST returns character data', async () => {
      expect(await mediator.characterService.getCharacter(mentor.id)).toEqual(mentor);
    });
  });

  describe('WHEN "assignResultForCharacters" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([messenger, mentor]);
    });

    it('MUST get all characters by there ids', async () => {
      await mediator.characterService.assignResultForCharacters(result.id, [mentor.id, messenger.id]);

      expect(mockedCharacterRepository.list).toHaveBeenCalledWith({ characterIds: [mentor.id, messenger.id] });
    });

    it('AND list of characters is empty, MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([]);
      let error;

      try {
        await mediator.characterService.assignResultForCharacters(result.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { error: 'Could not get any characters by provided ids' }));
    });

    it('MUST assign results for each of characters', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);

      await mediator.characterService.assignResultForCharacters(result.id, [mentor.id]);

      expect(mockedCharacterRepository.updateCharactersResults).toHaveBeenCalledWith({ add: { [mentor.id]: [result.id] }, characters: [mentor] });
    });
  });

  describe('WHEN "unassignResultForCharacters" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([messenger, mentor]);
    });

    it('MUST get all characters by there ids', async () => {
      await mediator.characterService.unassignResultForCharacters(result.id, [mentor.id, messenger.id]);

      expect(mockedCharacterRepository.list).toHaveBeenCalledWith({ characterIds: [mentor.id, messenger.id] });
    });

    it('AND list of characters is empty, MUST throw ui error', async () => {
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([]);
      let error;

      try {
        await mediator.characterService.unassignResultForCharacters(result.id, [mentor.id, messenger.id]);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UxException('empty_fields', { error: 'Could not get any characters by provided ids' }));
    });

    it('MUST assign results for each of characters', async () => {
      (mockedCharacterRepository.updateCharactersResults as jest.Mock).mockReset();
      const mentor = new MentorModel(MOCKED_MENTOR);

      mentor.setResultIds([result.id]);
      (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);

      await mediator.characterService.unassignResultForCharacters(result.id, [mentor.id]);

      expect(mockedCharacterRepository.updateCharactersResults).toHaveBeenCalledWith({ characters: [mentor], remove: { [mentor.id]: [result.id] } });
    });
  });

  describe('WHEN "createCharacter" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.add as jest.Mock).mockResolvedValue(mentor.id);
      (mockedCharacterRepository.generateModel as jest.Mock).mockReturnValue(mentor);
      (mockedCharacterRepository.generateModelId as jest.Mock).mockReturnValue(mentor);
    });

    it('MUST returns "characterId"', async () => {
      expect(await mediator.characterService.createCharacter(MOCKED_MENTOR)).toEqual(mentor.id);
    });

    it('MUST call "CharacterRepository.generateModel"', async () => {
      await mediator.characterService.createCharacter(MOCKED_MENTOR);

      expect(mockedCharacterRepository.generateModel).toHaveBeenCalledWith(MOCKED_MENTOR);
    });

    it('MUST call "CharacterRepository.generateModelId"', async () => {
      await mediator.characterService.createCharacter(MOCKED_MENTOR);

      expect(mockedCharacterRepository.generateModelId).toHaveBeenCalledWith(mentor);
    });

    it('MUST call "CharacterRepository.add"', async () => {
      await mediator.characterService.createCharacter(MOCKED_MENTOR);

      expect(mockedCharacterRepository.add).toHaveBeenCalledWith(mentor);
    });
  });

  describe('WHEN "updateCharacter" is called', () => {
    beforeEach(() => {
      (mockedCharacterRepository.replace as jest.Mock).mockResolvedValue(true);
      (mockedCharacterRepository.generateModel as jest.Mock).mockReturnValue(mentor);
    });

    it('MUST call "CharacterRepository.generateModel"', async () => {
      await mediator.characterService.updateCharacter(MOCKED_MENTOR);

      expect(mockedCharacterRepository.generateModel).toHaveBeenCalledWith(MOCKED_MENTOR);
    });

    it('MUST return boolean value', async () => {
      expect(await mediator.characterService.updateCharacter(MOCKED_MENTOR)).toEqual(true);
    });
  });

  describe('WHEN "removeCharacter" is called', () => {
    describe('AND character is "mentor"', () => {
      beforeEach(() => {
        (mockedCharacterRepository.remove as jest.Mock).mockResolvedValue(true);
        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor]);
        (mockedCharacterRepository.get as jest.Mock).mockResolvedValue(mentor);
      });

      it('AND those one will be the last one "mentor" in waterhole, MUST throw ui error', async () => {
        let error;

        try {
          await mediator.characterService.removeCharacter(mentor.id);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(
          mediator.characterService.errorLog.formatWrongFieldsError({
            error: 'not_enough_characters_in_waterholes',
            waterholes: mentor.waterholeIds.toString(),
          }),
        );
      });

      it('AND those one will be not the last one "mentor" in waterhole, MUST remove "mentor"', async () => {
        (mockedCharacterRepository.remove as jest.Mock).mockResolvedValue(true);
        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor, messenger]);

        expect(await mediator.characterService.removeCharacter(mentor.id)).toBeTruthy();
      });
    });

    describe('AND character is "messenger"', () => {
      beforeEach(() => {
        (mockedCharacterRepository.remove as jest.Mock).mockResolvedValue(true);
        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([messenger]);
        (mockedCharacterRepository.get as jest.Mock).mockResolvedValue(messenger);
      });

      it('AND those one will be the last one "messenger" in waterhole, MUST throw ui error', async () => {
        let error;

        try {
          await mediator.characterService.removeCharacter(messenger.id);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(
          mediator.characterService.errorLog.formatWrongFieldsError({
            error: 'not_enough_characters_in_waterholes',
            waterholes: messenger.waterholeIds.toString(),
          }),
        );
      });

      it('AND those one will be not the last one "messenger" in waterhole, MUST remove "messenger"', async () => {
        (mockedCharacterRepository.remove as jest.Mock).mockResolvedValue(true);
        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([mentor, messenger]);

        expect(await mediator.characterService.removeCharacter(messenger.id)).toBeTruthy();
      });
    });

    describe('AND character is "shadow"', () => {
      const shadow = new ShadowModel(MOCKED_SHADOW);
      const mainEdge = new MainEdgeModel(MOCKED_MAIN_EDGE);

      beforeEach(() => {
        (mockedCharacterRepository.remove as jest.Mock).mockResolvedValue(true);
        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([shadow]);
        (mockedChallengeRepository.list as jest.Mock).mockResolvedValue([mainEdge]);
        (mockedCharacterRepository.get as jest.Mock).mockResolvedValue(shadow);
      });

      it('AND "shadow" is assigned to edge, MUST throw ui error', async () => {
        let error;

        try {
          await mediator.characterService.removeCharacter(shadow.id);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(
          mediator.characterService.errorLog.formatWrongFieldsError({ characterId: shadow.id, error: 'can`t_remove_shadow', challenges: '1' }),
        );
      });

      it('AND "shadow" is not assigned to edge, MUST remove "shadow"', async () => {
        (mockedChallengeRepository.list as jest.Mock).mockResolvedValue([]);

        expect(await mediator.characterService.removeCharacter(shadow.id)).toBeTruthy();
      });
    });

    describe('AND character is "guard"', () => {
      const guard = new GuardModel(MOCKED_GUARD);
      const mainEdge = new MainEdgeModel(MOCKED_MAIN_EDGE);

      beforeEach(() => {
        (mockedCharacterRepository.remove as jest.Mock).mockResolvedValue(true);
        (mockedCharacterRepository.list as jest.Mock).mockResolvedValue([guard]);
        (mockedChallengeRepository.list as jest.Mock).mockResolvedValue([mainEdge]);
        (mockedCharacterRepository.get as jest.Mock).mockResolvedValue(guard);
      });

      it('AND "guard" is assigned to edge, MUST throw ui error', async () => {
        let error;

        try {
          await mediator.characterService.removeCharacter(guard.id);
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(
          mediator.characterService.errorLog.formatWrongFieldsError({ characterId: guard.id, error: 'can`t_remove_guard', challenges: '1' }),
        );
      });

      it('AND "guard" is not assigned to edge, MUST remove "guard"', async () => {
        (mockedChallengeRepository.list as jest.Mock).mockResolvedValue([]);

        expect(await mediator.characterService.removeCharacter(guard.id)).toBeTruthy();
      });
    });

    it('AND character is "ally", MUST remove character', async () => {
      const ally = new AllyModel(MOCKED_ALLY);

      (mockedCharacterRepository.remove as jest.Mock).mockResolvedValue(true);
      (mockedCharacterRepository.get as jest.Mock).mockResolvedValue(ally);

      expect(await mediator.characterService.removeCharacter(ally.id)).toBeTruthy();
    });

    it('AND character is "enemy", MUST remove character', async () => {
      const enemy = new EnemyModel(MOCKED_ENEMY);

      (mockedCharacterRepository.remove as jest.Mock).mockResolvedValue(true);
      (mockedCharacterRepository.get as jest.Mock).mockResolvedValue(enemy);

      expect(await mediator.characterService.removeCharacter(enemy.id)).toBeTruthy();
    });
  });
});

describe('result', () => {
  const mediator = new ServiceMediator();
  const result = new ResultModel(MOCKED_RESULT);
  const mockedResultRepository = new ResultRepository();

  Object.defineProperty(mediator.characterService, '_resultRepository', {
    writable: true,
    value: mockedResultRepository,
  });

  beforeEach(() => {
    (mockedResultRepository.generateModel as jest.Mock).mockReturnValue(result);
    (mockedResultRepository.get as jest.Mock).mockReturnValue(result);
    (mockedResultRepository.list as jest.Mock).mockReturnValue([result]);
    (mockedResultRepository.add as jest.Mock).mockReturnValue(result.id);
    (mockedResultRepository.replace as jest.Mock).mockReturnValue(true);
    (mockedResultRepository.remove as jest.Mock).mockReturnValue(true);
  });

  describe('WHEN "addResult" is called', () => {
    it('MUST generate model from input data', async () => {
      await mediator.characterService.addResult(MOCKED_RESULT);

      expect(mockedResultRepository.generateModel).toHaveBeenCalledWith(MOCKED_RESULT);
    });

    it('MUST generate model id', async () => {
      await mediator.characterService.addResult(MOCKED_RESULT);

      expect(mockedResultRepository.generateModelId).toHaveBeenCalledWith(result);
    });

    it('MUST add result to db', async () => {
      await mediator.characterService.addResult(MOCKED_RESULT);

      expect(mockedResultRepository.add).toHaveBeenCalledWith(result);
    });

    it('MUST return result id', async () => {
      expect(await mediator.characterService.addResult(MOCKED_RESULT)).toEqual(result.id);
    });
  });

  describe('WHEN "removeResult" is called', () => {
    it('MUST remove result from repository', async () => {
      await mediator.characterService.removeResult(result.id);

      expect(mockedResultRepository.remove).toHaveBeenCalledWith(result.id);
    });

    it('MUST return boolean value', async () => {
      expect(await mediator.characterService.removeResult(result.id)).toBeTruthy();
    });
  });

  describe('WHEN "updateResult" is called', () => {
    it('MUST generate model from input data', async () => {
      await mediator.characterService.updateResult(MOCKED_RESULT);

      expect(mockedResultRepository.generateModel).toHaveBeenCalledWith(MOCKED_RESULT);
    });

    it('MUST update result to db', async () => {
      await mediator.characterService.updateResult(MOCKED_RESULT);

      expect(mockedResultRepository.replace).toHaveBeenCalledWith(result);
    });

    it('MUST return boolean value', async () => {
      expect(await mediator.characterService.updateResult(MOCKED_RESULT)).toBeTruthy();
    });
  });

  describe('WHEN "getResult" is called', () => {
    it('MUST get data from repository by id', async () => {
      await mediator.characterService.getResult(result.id);

      expect(mockedResultRepository.get).toHaveBeenCalledWith(result.id);
    });

    it('MUST return result data', async () => {
      expect(await mediator.characterService.getResult(result.id)).toEqual(result);
    });
  });

  describe('WHEN "getResults" is called', () => {
    it('MUST get data from repository by id', async () => {
      await mediator.characterService.getResults({});

      expect(mockedResultRepository.list).toHaveBeenCalledWith({});
    });

    it('MUST return results list', async () => {
      expect(await mediator.characterService.getResults({})).toEqual([result]);
    });
  });
});
