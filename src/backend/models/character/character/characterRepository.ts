import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

import { AllyModel, IAllyModel } from './allyModel';
import { CharacterModel, ICharacterModel } from './characterModel';
import { EnemyModel, IEnemyModel } from './enemyModel';
import { GuardModel, IGuardModel } from './guardModel';
import { IMentorModel, MentorModel } from './mentorModel';
import { IShadowModel, ShadowModel } from './shadowModel';

export interface ICharacterListQuery extends IListQuery {
  plotId?: string;
  characterIds?: string[];
  waterholeIds?: string[];
}

export interface UpdateCharactersPropsType {
  add?: Record<string, string[]>;
  remove?: Record<string, string[]>;
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
        return new MentorModel(data as IMentorModel);
    }
  }

  async updateMessengersCalls(props: UpdateCharactersPropsType): Promise<boolean> {
    return Promise.resolve(true);
  }

  async updateMentorsLaws(props: UpdateCharactersPropsType): Promise<boolean> {
    return Promise.resolve(true);
  }

  async updateCharactersResults(props: UpdateCharactersPropsType): Promise<boolean> {
    return Promise.resolve(true);
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {};
  }
}
