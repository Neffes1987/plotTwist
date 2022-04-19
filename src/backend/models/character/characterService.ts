import {IAbstractModel} from '../../base/abstractModel';
import {AbstractService} from '../../base/service/abstractService';
import {ServiceMediator} from '../../controller/serviceMediator';

import {ICharacterModel} from './character/characterModel';

export class CharacterService extends AbstractService {
  constructor(mediator: ServiceMediator) {
    super(mediator);
  }

  assignCallToMessenger(callId: string, characterId: string) {
    return true;
  }

  assignLawToMentor(lawId: string, characterId: string) {
    return true;
  }

  getCharactersList(page: number, limit: number, queryList: string) {
    return [];
  }

  getCharacter(characterId: string) {
    return null;
  }

  assignResultForCharacters(resultId: string, characterIds: string[]) {
    return true;
  }

  createCharacter(data: ICharacterModel) {
    return '';
  }

  updateCharacter(data: ICharacterModel) {
    return true;
  }

  removeCharacter(characterId: string) {
    return true;
  }

  // results
  addResult(data: IAbstractModel) {
    return '';
  }

  removeResult(resultId: string) {
    return true;
  }

  updateResult(data: IAbstractModel) {
    return true;
  }

  getResult(resultId: string) {
    return null;
  }

  getResults(page: number, limit: number, queryList: string) {
    return [];
  }

  clean(worldIds: string) {
    return true;
  }
}
