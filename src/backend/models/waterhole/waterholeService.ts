import { IWaterholeModel } from '@backend';

import { AbstractService } from '../../base/service/abstractService';
import { ServiceMediator } from '../../controller/serviceMediator';

import { WaterholeModel } from './waterhole/waterholeModel';
import { WaterholeRepository } from './waterhole/waterholeRepository';

export class WaterholeService extends AbstractService {
  static readonly MIN_WATERHOLES_IN_WORLD = 2;

  _waterholeRepository: WaterholeRepository;

  constructor(mediator: ServiceMediator) {
    super(mediator);

    this._waterholeRepository = new WaterholeRepository();
  }

  async getWaterholesList(worldId: string): Promise<WaterholeModel[]> {
    return this._waterholeRepository.list(worldId);
  }

  async getWaterhole(waterholeId: string): Promise<Nullable<WaterholeModel>> {
    return this._waterholeRepository.get(waterholeId);
  }

  async createWaterhole(data: IWaterholeModel): Promise<string> {
    const waterhole = this._waterholeRepository.generateModel(data);

    this._waterholeRepository.generateModelId(waterhole);

    return this._waterholeRepository.add(waterhole);
  }

  async updateWaterhole(data: IWaterholeModel): Promise<boolean> {
    const waterhole = this._waterholeRepository.generateModel(data);

    return this._waterholeRepository.replace(waterhole);
  }

  async removeWaterhole(waterholeId: string): Promise<boolean> {
    const waterhole = await this._waterholeRepository.get(waterholeId);

    if (!waterhole?.worldId) {
      throw this.errorLog.formatWrongFieldsError({ waterholeId });
    }

    const list = await this._waterholeRepository.list(waterhole.worldId);

    if (list.length <= WaterholeService.MIN_WATERHOLES_IN_WORLD) {
      throw this.errorLog.formatWrongFieldsError({ waterholesInList: `less_then_${WaterholeService.MIN_WATERHOLES_IN_WORLD}` });
    }

    return this._waterholeRepository.remove(waterholeId);
  }
}
