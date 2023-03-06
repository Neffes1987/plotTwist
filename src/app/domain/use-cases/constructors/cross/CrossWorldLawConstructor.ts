import { ActiveRecord } from 'src/app/domain/entities/ActiveRecord/ActiveRecord';

import { ILawConstructor } from '../../../../../types/constructors/law.constructor';
import { IWorldLawConstructor } from '../../../../../types/constructors/world.constructor';
import { CrossWorldLawDTO } from '../../../../../types/entities/cross';
import { CrossWorldLaw } from '../../../entities/Cross/CrossWorldLaw/CrossWorldLaw';

import { CommonCrossConstructor } from './CommonCrossConstructor';

export class CrossWorldLawConstructor extends CommonCrossConstructor<CrossWorldLawDTO> implements IWorldLawConstructor {
  private readonly lawConstructor: ILawConstructor;

  constructor(lawConstructor: ILawConstructor) {
    super();
    this.lawConstructor = lawConstructor;
  }

  async assignedList(worldId: string): Promise<LawInWorldDTO[]> {
    const crossWorldLaw = this.getModel();

    const crossWorldLawDTOS = await crossWorldLaw.list({
      query: {
        worldId,
      },
    });

    const existedLawsList: Record<string, boolean> = {};

    crossWorldLawDTOS.forEach(({ lawId, isBroken }) => {
      existedLawsList[lawId] = isBroken;
    });

    const characters = await this.lawConstructor.list({ query: { id: Object.keys(existedLawsList) } });

    return characters.map(item => ({
      ...item,
      isBroken: existedLawsList[item.id],
    })) as LawInWorldDTO[];
  }

  async toggleWorldLawsStatus(lawId: string, isBroken: boolean): Promise<boolean> {
    const crossWorldLaw = new CrossWorldLaw();

    await crossWorldLaw.loadByLawId(lawId);
    crossWorldLaw.isBroken = isBroken;

    await crossWorldLaw.save();

    return true;
  }

  async toggle(lawIds: string[], worldId: string): Promise<LawInWorldDTO[]> {
    const crossWorldLaw = new CrossWorldLaw();

    const availableLaws = await crossWorldLaw.list({
      query: {
        worldId,
      },
    });

    await this.upsertBunch(worldId, availableLaws, lawIds, 'lawId');

    return this.assignedList(worldId);
  }

  async toggleWorldLawStatus(lawId: string, isBroken: boolean): Promise<boolean> {
    const crossWorldLaw = new CrossWorldLaw();

    await crossWorldLaw.loadByLawId(lawId);
    crossWorldLaw.isBroken = isBroken;

    await crossWorldLaw.save();

    return true;
  }

  getModelDTO(parentID: string): CrossWorldLawDTO {
    return {
      worldId: parentID,
      lawId: '',
      id: '',
      isBroken: false,
    };
  }

  getModel(): ActiveRecord<CrossWorldLawDTO> {
    return new CrossWorldLaw();
  }
}
