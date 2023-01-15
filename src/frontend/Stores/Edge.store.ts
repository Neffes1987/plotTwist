import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { IEdgeController } from '../../types/controllers/controller';
import { EdgeDTO } from '../../types/entities/edge';

export class EdgeStore {
  edge: EdgeDTO;
  private readonly crud: IEdgeController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async get(worldId: string): Promise<void> {
    this.edge = await this.crud.getEdgeByWorldId(worldId);
  }

  async save(worldId: string, dto: EdgeDTO): Promise<string> {
    if (!worldId) {
      return '';
    }

    if (dto.id) {
      await this.update(dto);

      return dto.id;
    }

    return this.create(worldId, dto);
  }

  private async update(dto: EdgeDTO): Promise<void> {
    await this.crud.saveEdge(dto);
  }

  private async create(worldId: string, dto: EdgeDTO): Promise<string> {
    const id = await this.crud.createEdge(worldId, dto);

    runInAction(() => {
      this.edge = { ...dto, id };
    });

    return id;
  }
}

export const edgeStore = new EdgeStore();
