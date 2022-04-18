import {AbstractService} from '../../base/service/abstractService';
import {Command} from '../../base/service/command';
import {ServiceMediator} from '../../controller/serviceMediator';

import {IWaterholeModel, WaterholeModel} from './waterhole/waterholeModel';

export class WaterholeService extends AbstractService {
  constructor(mediator: ServiceMediator) {
    super(mediator);
  }

  async getWaterholesList(page: number, limit: number): Promise<WaterholeModel[]> {
    return Promise.resolve([]);
  }

  async getWaterhole(waterholeId: string): Promise<Nullable<WaterholeModel>> {
    return Promise.resolve(null);
  }

  async createWaterhole(data: IWaterholeModel): Promise<string> {
    return Promise.resolve('');
  }

  async updateWaterhole(data: IWaterholeModel): Promise<boolean> {
    return Promise.resolve(true);
  }

  async removeWaterhole(waterholeId: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  async clean(worldIds: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  async executeCommand(command: Command): Promise<unknown> {
    return Promise.resolve(null);
  }
}
