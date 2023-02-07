import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { CharacterEnum } from '../../constants/character.enum';
import { ICharacterController } from '../../types/controllers/controller';
import { CharacterDTO, CharacterInWorldDTO } from '../../types/entities/character';

export class CharactersStore {
  characters: CharacterDTO[] = [];
  private readonly crud: ICharacterController;
  private readonly type: CharacterEnum;

  constructor(type: CharacterEnum) {
    makeAutoObservable(this);
    this.crud = appController;
    this.type = type;
  }

  async list(params?: ListParams<CharacterInWorldDTO>): Promise<void> {
    const data = await this.crud.getCharacters({
      ...params,
      query: {
        ...(params?.query ?? {}),
        type: this.type,
      },
    });

    runInAction(() => {
      this.characters = data;
    });
  }

  async update(dto: CharacterInWorldDTO): Promise<void> {
    await this.crud.saveCharacter(dto);
    await this.list({});
  }

  async delete(id?: string): Promise<void> {
    if (!id) {
      return;
    }

    await this.crud.removeCharacter(id);
    await this.list({});
  }

  async create(dto: CharacterInWorldDTO): Promise<string> {
    const id = await this.crud.saveCharacter(dto);

    runInAction(() => {
      this.characters.push({ ...dto, id });
    });

    return id;
  }
}

export const charactersStore = {
  [CharacterEnum.Ally]: new CharactersStore(CharacterEnum.Ally),
  [CharacterEnum.Enemy]: new CharactersStore(CharacterEnum.Enemy),
  [CharacterEnum.Guard]: new CharactersStore(CharacterEnum.Guard),
  [CharacterEnum.Mentor]: new CharactersStore(CharacterEnum.Mentor),
  [CharacterEnum.Shadow]: new CharactersStore(CharacterEnum.Shadow),
  [CharacterEnum.Messenger]: new CharactersStore(CharacterEnum.Messenger),
};
