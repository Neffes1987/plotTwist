import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IWaterholeController } from '../../types/controllers/controller';

export class WaterholesStore {
  waterholes: WaterholeDTO[] = [];
  private readonly crud: IWaterholeController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(): Promise<void> {
    const data = await this.crud.waterholeList({});

    runInAction(() => {
      this.waterholes = data;
    });
  }

  async update(dto: WaterholeDTO): Promise<void> {
    await this.crud.saveWaterhole(dto);
    await this.list();
  }

  async delete(id: string): Promise<void> {
    await this.crud.deleteWaterhole(id);
    await this.list();
  }

  async create(dto: WaterholeDTO): Promise<string> {
    const waterholeId = await this.crud.saveWaterhole(dto);

    runInAction(() => {
      this.waterholes.push({ ...dto, id: waterholeId });
    });

    return waterholeId;
  }
}

export const waterholeList = new WaterholesStore();
