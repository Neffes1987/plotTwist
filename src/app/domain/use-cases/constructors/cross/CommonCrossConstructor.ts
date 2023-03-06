import { ActiveRecord } from '../../../entities/ActiveRecord/ActiveRecord';

import { ButchSavingConstructor } from './ButchSavingConstructor';

export abstract class CommonCrossConstructor<T extends CommonEntityDTO> {
  async upsertBunch(parentID: string, existedDTOs: T[], addedIds: string[], crossIdFieldName: keyof T): Promise<boolean> {
    const constructor = new ButchSavingConstructor({ ...this.getModelDTO(parentID) }, existedDTOs, addedIds, crossIdFieldName);

    const { removedIds, addedDTOs } = constructor.execute();

    const model = this.getModel();

    await model.removeButch(removedIds);
    await model.saveButch(addedDTOs);

    return true;
  }

  abstract getModel(): ActiveRecord<T>;
  abstract getModelDTO(parentID: string): T;
}
