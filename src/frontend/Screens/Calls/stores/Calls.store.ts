import { appController } from 'backend';
import { makeAutoObservable, runInAction } from 'mobx';

import { ICallController } from '../../../../types/controllers/controller';
import { CallDTO } from '../../../../types/entities/call';

export class CallsStore {
  calls: CallDTO[] = [];
  activeCall: Nullable<CallDTO> = null;
  private readonly crud: ICallController;

  constructor() {
    makeAutoObservable(this);
    this.crud = appController;
  }

  async list(): Promise<void> {
    const data = await this.crud.getCalls({});

    runInAction(() => {
      this.calls = data;
    });
  }

  async update(dto: CallDTO): Promise<void> {
    await this.crud.saveCall(dto);
    await this.list();
  }

  async delete(id?: string): Promise<void> {
    if (!id) {
      return;
    }

    await this.crud.removeCall(id);
    await this.list();
  }

  async get(id: string): Promise<void> {
    this.activeCall = await this.crud.getCall(id);
    await this.list();
  }

  async create(dto: CallDTO): Promise<string> {
    const lawId = await this.crud.saveCall(dto);

    runInAction(() => {
      this.calls.push({ ...dto, id: lawId });
    });

    return lawId;
  }
}

export const callsStore = new CallsStore();
