import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { ILawController } from '../../../../types/controllers/controller';

export class LawsStore {
  laws: LawDTO[] = [];
  private readonly crud: ILawController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(): Promise<void> {
    const data = await this.crud.lawList({});

    runInAction(() => {
      this.laws = data;
    });
  }

  async update(dto: LawDTO): Promise<void> {
    await this.crud.saveLaw(dto);
    await this.list();
  }

  async delete(id: string): Promise<void> {
    await this.crud.deleteLaw(id);
    await this.list();
  }

  async create(dto: LawDTO): Promise<string> {
    const lawId = await this.crud.saveLaw(dto);

    runInAction(() => {
      this.laws.push({ ...dto, id: lawId });
    });

    return lawId;
  }
}

export const lawsStore = new LawsStore();
