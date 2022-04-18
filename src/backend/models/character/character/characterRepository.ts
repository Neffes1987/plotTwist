import {AbstractRepository, IListQuery} from '../../../base/abstractRepository';

import {AllyModel, IAllyModel} from './allyModel';
import {CharacterModel, ICharacterModel} from './characterModel';
import {EnemyModel, IEnemyModel} from './enemyModel';
import {GuardModel, IGuardModel} from './guardModel';
import {IMentorModel, MentorModel} from './mentorModel';
import {IShadowModel, ShadowModel} from './shadowModel';

export class CharacterRepository extends AbstractRepository<CharacterModel> {
  async list(page: number, limit: number): Promise<CharacterModel[]> {
    return super.getList({
      page,
      limit,
    });
  }

  createDbTable(): string {
    return '';
  }

  dbCreate(model: CharacterModel): Promise<string> {
    return Promise.resolve('');
  }

  dbDelete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  dbFind(id: string): Promise<Nullable<CharacterModel>> {
    return Promise.resolve(null);
  }

  dbFindAll(query: IListQuery): Promise<CharacterModel[]> {
    return Promise.resolve([]);
  }

  dbUpdate(model: CharacterModel): Promise<boolean> {
    return Promise.resolve(false);
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
}
