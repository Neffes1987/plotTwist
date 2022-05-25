import { IAbstractModel } from '@backend';

import { IListQuery } from '../../base/interface';
import { AbstractService } from '../../base/service/abstractService';
import { ServiceMediator } from '../../controller/serviceMediator';

import { CharacterModel } from './character/characterModel';
import { CharacterRepository } from './character/characterRepository';
import { ICharacterListQuery, ICharacterModel, UpdateCharactersPropsType } from './character/interface';
import { MentorModel } from './character/mentorModel';
import { MessengerModel } from './character/messengerModel';
import { ResultModel } from './result/resultModel';
import { ResultRepository } from './result/resultRepository';

export class CharacterService extends AbstractService {
  private readonly _resultRepository: ResultRepository;
  private readonly _characterRepository: CharacterRepository;

  constructor(mediator: ServiceMediator) {
    super(mediator);

    this._resultRepository = new ResultRepository();
    this._characterRepository = new CharacterRepository();
  }

  async assignCallToMessenger(callId: string, characterIds: string[]): Promise<boolean> {
    const messengers = await this._characterRepository.list({ characterIds });

    if (!messengers || messengers.length === 0) {
      throw this.errorLog.formatWrongFieldsError({ error: 'Could not get messengers by provided ids' });
    }

    const result: UpdateCharactersPropsType = {
      characters: [],
    };

    result.add = {};

    for (const character of messengers) {
      if (character.type !== 'messenger') {
        throw this.errorLog.formatWrongFieldsError({ [character.id]: 'Character is not a messenger' });
      }

      if ((character as MessengerModel).callIds.includes(callId)) {
        continue;
      }

      if (!result.add[character.id]) {
        result.add[character.id] = [];
      }

      result.add[character.id].push(callId);
      result.characters.push(character);
    }

    if (!Object.keys(result.add).length) {
      return true;
    }

    return this._characterRepository.updateMessengersCalls(result);
  }

  async unassignCallFromMessengers(callId: string, characterIds: string[]): Promise<boolean> {
    const messengers = await this._characterRepository.list({ characterIds });

    if (!messengers || messengers.length === 0) {
      throw this.errorLog.formatWrongFieldsError({ error: 'Could not get messengers by provided ids' });
    }

    const result: UpdateCharactersPropsType = {
      characters: [],
    };

    result.remove = {};

    for (const character of messengers) {
      if (character.type !== 'messenger') {
        throw this.errorLog.formatWrongFieldsError({ [character.id]: 'Character is not a messenger' });
      }

      if (!(character as MessengerModel).callIds.includes(callId)) {
        continue;
      }

      if (!result.remove[character.id]) {
        result.remove[character.id] = [];
      }

      result.remove[character.id].push(callId);
      result.characters.push(character);
    }

    if (!Object.keys(result.remove).length) {
      return true;
    }

    return this._characterRepository.updateMessengersCalls(result);
  }

  async assignLawToMentors(lawId: string, characterIds: string[]): Promise<boolean> {
    const mentors = await this._characterRepository.list({ characterIds });

    if (!mentors || mentors.length === 0) {
      throw this.errorLog.formatWrongFieldsError({ error: 'Could not get mentors by provided ids' });
    }

    const result: UpdateCharactersPropsType = {
      characters: [],
    };

    result.add = {};

    for (const character of mentors) {
      if (character.type !== 'mentor') {
        throw this.errorLog.formatWrongFieldsError({ [character.id]: 'Character is not a messenger' });
      }

      if ((character as MentorModel).lawIds.includes(lawId)) {
        continue;
      }

      if (!result.add[character.id]) {
        result.add[character.id] = [];
      }

      result.add[character.id].push(lawId);
      result.characters.push(character);
    }

    if (!result.add[lawId] || result.add[lawId].length === 0) {
      return true;
    }

    return this._characterRepository.updateMentorsLaws(result);
  }

  async unassignLawToMentors(lawId: string, characterIds: string[]): Promise<boolean> {
    const mentors = await this._characterRepository.list({ characterIds });

    if (!mentors || mentors.length === 0) {
      throw this.errorLog.formatWrongFieldsError({ error: 'Could not get mentors by provided ids' });
    }

    const result: UpdateCharactersPropsType = {
      characters: [],
    };

    result.remove = {};

    for (const character of mentors) {
      if (character.type !== 'mentor') {
        throw this.errorLog.formatWrongFieldsError({ [character.id]: 'Character is not a messenger' });
      }

      if (!(character as MentorModel).lawIds.includes(lawId)) {
        continue;
      }

      if (!result.remove[character.id]) {
        result.remove[character.id] = [];
      }

      result.remove[character.id].push(lawId);
      result.characters.push(character);
    }

    if (!result.remove[lawId] || result.remove[lawId].length === 0) {
      return true;
    }

    return this._characterRepository.updateMentorsLaws(result);
  }

  async getCharactersList(props: ICharacterListQuery): Promise<CharacterModel[]> {
    return this._characterRepository.list(props);
  }

  async getCharacter(characterId: string): Promise<Nullable<CharacterModel>> {
    return this._characterRepository.get(characterId);
  }

  async assignResultForCharacters(resultId: string, characterIds: string[]): Promise<boolean> {
    const characters = await this._characterRepository.list({ characterIds });

    if (!characters || characters.length === 0) {
      throw this.errorLog.formatWrongFieldsError({ error: 'Could not get any characters by provided ids' });
    }

    const result: UpdateCharactersPropsType = {
      characters: [],
    };

    result.add = {};

    for (const character of characters) {
      if (character.resultIds.includes(resultId)) {
        continue;
      }

      if (!result.add[character.id]) {
        result.add[character.id] = [];
      }

      result.add[character.id].push(resultId);
      result.characters.push(character);
    }

    if (!Object.keys(result.add)) {
      return true;
    }

    return this._characterRepository.updateCharactersResults(result);
  }

  async unassignResultForCharacters(resultId: string, characterIds: string[]): Promise<boolean> {
    const characters = await this._characterRepository.list({ characterIds });

    if (!characters || characters.length === 0) {
      throw this.errorLog.formatWrongFieldsError({ error: 'Could not get any characters by provided ids' });
    }

    const result: UpdateCharactersPropsType = {
      characters: [],
    };

    result.remove = {};

    for (const character of characters) {
      if (!character.resultIds.includes(resultId)) {
        continue;
      }

      if (!result.remove[character.id]) {
        result.remove[character.id] = [];
      }

      result.remove[character.id].push(resultId);
      result.characters.push(character);
    }

    if (!Object.keys(result.remove).length) {
      return true;
    }

    return this._characterRepository.updateCharactersResults(result);
  }

  async createCharacter(data: ICharacterModel): Promise<string> {
    const model = this._characterRepository.generateModel(data);

    this._characterRepository.generateModelId(model);

    return this._characterRepository.add(model);
  }

  async updateCharacter(data: ICharacterModel): Promise<boolean> {
    const model = this._characterRepository.generateModel(data);

    return this._characterRepository.replace(model);
  }

  async removeCharacter(characterId: string): Promise<boolean> {
    const character = await this.getCharacter(characterId);

    if (!character) {
      throw this.errorLog.formatWrongFieldsError({ characterId, error: 'Can`t find the character by id' });
    }

    if (character.type === 'messenger' || character.type === 'mentor') {
      if (await this._checkCharacterInWaterholes(character as MentorModel)) {
        return this._characterRepository.remove(character.id);
      }
    }

    if (character.type === 'shadow') {
      const challenges = await this.mediator.challengeService.getChallengesList({ shadowId: character.id });

      if (challenges.length > 0) {
        throw this.errorLog.formatWrongFieldsError({ characterId, error: 'can`t_remove_shadow', challenges: challenges.length.toString() });
      }

      return this._characterRepository.remove(characterId);
    }

    if (character.type === 'guard') {
      const challenges = await this.mediator.challengeService.getChallengesList({ guardId: character.id });

      if (challenges.length > 0) {
        throw this.errorLog.formatWrongFieldsError({ characterId, error: 'can`t_remove_guard', challenges: challenges.length.toString() });
      }

      return this._characterRepository.remove(characterId);
    }

    return this._characterRepository.remove(characterId);
  }

  // results
  async addResult(data: IAbstractModel): Promise<string> {
    const model = this._resultRepository.generateModel(data);

    this._resultRepository.generateModelId(model);

    return this._resultRepository.add(model);
  }

  async removeResult(resultId: string): Promise<boolean> {
    return this._resultRepository.remove(resultId);
  }

  async updateResult(data: IAbstractModel): Promise<boolean> {
    const model = this._resultRepository.generateModel(data);

    return this._resultRepository.replace(model);
  }

  async getResult(resultId: string): Promise<Nullable<ResultModel>> {
    return this._resultRepository.get(resultId);
  }

  async getResults(props: IListQuery): Promise<ResultModel[]> {
    return this._resultRepository.list(props);
  }

  async _checkCharacterInWaterholes(character: MentorModel | MessengerModel): Promise<boolean> {
    const charactersInWaterholes = await this._characterRepository.list({ waterholeIds: character.waterholeIds });

    if (!charactersInWaterholes || charactersInWaterholes.length === 0) {
      throw this.errorLog.formatWrongFieldsError({ error: 'No one character in waterholes list' });
    }

    if (charactersInWaterholes.length === 1 && charactersInWaterholes[0].id === character.id) {
      throw this.errorLog.formatWrongFieldsError({ error: 'not_enough_characters_in_waterholes', waterholes: character.waterholeIds.toString() });
    }

    const waterholesIds: Record<string, number> = {};

    charactersInWaterholes.forEach((characterInWaterhole: CharacterModel) => {
      if (characterInWaterhole.type === 'messenger' || characterInWaterhole.type === 'mentor') {
        (characterInWaterhole as MentorModel).waterholeIds.forEach((id: string) => {
          waterholesIds[id] = 1;
        });
      }
    });

    const emptyWaterholesIds: string[] = [];

    for (const waterholesId of (character as MentorModel).waterholeIds) {
      if (!waterholesIds[waterholesId]) {
        emptyWaterholesIds.push(waterholesId);
      }
    }

    if (emptyWaterholesIds.length) {
      throw this.errorLog.formatWrongFieldsError({ error: 'not_enough_characters_in_waterholes', waterholes: emptyWaterholesIds.toString() });
    }

    return true;
  }
}
