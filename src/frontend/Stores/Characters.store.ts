import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { ICharacterController } from '../../types/controllers/controller';
import { CharacterDTO } from '../../types/entities/character';

export class CharactersStore {
  characters: CharacterDTO[] = [];
  activeCharacter: Nullable<CharacterDTO> = null;

  private readonly crud: ICharacterController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(params?: ListParams<CharacterDTO>): Promise<void> {
    const data = await this.crud.getCharacters(params ?? {});

    runInAction(() => {
      this.characters = data;
    });
  }

  async get(id: string): Promise<void> {
    const [character] = await this.crud.getCharacters({
      query: {
        id,
      },
    });

    this.activeCharacter = character;
  }

  async delete(id?: string): Promise<void> {
    if (!id) {
      return;
    }

    await this.crud.removeCharacter(id);
    await this.list({});
  }

  async save(dto: CharacterDTO): Promise<string> {
    const id = await this.crud.saveCharacter(dto);

    runInAction(() => {
      this.characters.push({ ...dto, id });
    });

    return id;
  }
}

export const charactersStore = new CharactersStore();
