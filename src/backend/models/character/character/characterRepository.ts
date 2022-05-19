import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

import { AllyModel, IAllyModel } from './allyModel';
import { CharacterModel, ICharacterModel } from './characterModel';
import { EnemyModel, IEnemyModel } from './enemyModel';
import { GuardModel, IGuardModel } from './guardModel';
import { IMentorModel, MentorModel } from './mentorModel';
import { IMessengerModel, MessengerModel } from './messengerModel';
import { IShadowModel, ShadowModel } from './shadowModel';

export interface ICharacterListQuery extends IListQuery {
  plotId?: string;
  characterIds?: string[];
  waterholeIds?: string[];
}

export interface UpdateCharactersPropsType {
  add?: Record<string, string[]>;
  remove?: Record<string, string[]>;
  characters: CharacterModel[];
}

export class CharacterRepository extends AbstractRepository<CharacterModel> {
  constructor() {
    super('character');
  }

  async list(query: ICharacterListQuery): Promise<CharacterModel[]> {
    return super.getList<ICharacterListQuery>(query);
  }

  generateModel(data: ICharacterModel): CharacterModel {
    switch (data.type) {
      case 'guard':
        return new GuardModel(data as IGuardModel);
      case 'enemy':
        return new EnemyModel(data as IEnemyModel);
      case 'mentor':
        return new MentorModel(data as IMentorModel);
      case 'shadow':
        return new ShadowModel(data as IShadowModel);
      case 'ally':
        return new AllyModel(data as IAllyModel);
      case 'messenger':
        return new MessengerModel(data as IMessengerModel);
    }
  }

  async updateMessengersCalls(props: UpdateCharactersPropsType): Promise<boolean> {
    const { characters, remove, add } = props;
    const promises: Promise<boolean>[] = [];

    characters.forEach((character: CharacterModel) => {
      const currentCalls = (character as MessengerModel).callIds;
      const newCalls: string[] = [];

      if (add?.[character.id]) {
        [...add[character.id], ...currentCalls].forEach((callId: string) => {
          newCalls[callId] = 1;
        });
      }

      if (remove?.[character.id]) {
        currentCalls.forEach((callId: string) => {
          if (!remove[character.id].includes(callId)) {
            newCalls[callId] = 1;
          }
        });
      }

      (character as MessengerModel).setCallIds(Object.keys(newCalls));
      promises.push(this.replace(character));
    });

    await Promise.all(promises);

    return true;
  }

  async updateMentorsLaws(props: UpdateCharactersPropsType): Promise<boolean> {
    const { characters, remove, add } = props;
    const promises: Promise<boolean>[] = [];

    characters.forEach((character: CharacterModel) => {
      const currentLaws = (character as MentorModel).lawIds;
      const newLaws: string[] = [];

      if (add?.[character.id]) {
        [...add[character.id], ...currentLaws].forEach((lawId: string) => {
          newLaws[lawId] = 1;
        });
      }

      if (remove?.[character.id]) {
        currentLaws.forEach((lawId: string) => {
          if (!remove[character.id].includes(lawId)) {
            newLaws[lawId] = 1;
          }
        });
      }

      (character as MentorModel).setLaws(Object.keys(newLaws));
      promises.push(this.replace(character));
    });

    await Promise.all(promises);

    return true;
  }

  async updateCharactersResults(props: UpdateCharactersPropsType): Promise<boolean> {
    const { characters, remove, add } = props;
    const promises: Promise<boolean>[] = [];

    characters.forEach((character: CharacterModel) => {
      const currentResults = character.resultIds;
      const newResults: string[] = [];

      if (add?.[character.id]) {
        [...add[character.id], ...currentResults].forEach((resultId: string) => {
          newResults[resultId] = 1;
        });
      }

      if (remove?.[character.id]) {
        currentResults.forEach((resultId: string) => {
          if (!remove[character.id].includes(resultId)) {
            newResults[resultId] = 1;
          }
        });
      }

      character.setResultIds(Object.keys(newResults));
      promises.push(this.replace(character));
    });

    await Promise.all(promises);

    return true;
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {
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
      allyType: 'TEXT',
      allyForHero: 'TEXT',
      callForAlly: 'TEXT',
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
    };
  }
}
