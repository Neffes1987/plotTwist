import { RuleError } from '../../../../errors/RuleError';
import { AbstractWorld } from '../../../entities/World/AbstractWorld/AbstractWorld';
import { RepositoryFactory } from '../../../repositories/RepositoryFactory/RepositoryFactory';
import { AbstractConstructor } from '../AbstractConstructor/AbstractConstructor';
import { IGetWorldWorldList } from '../PlotConstructor/interface';

export class WorldConstructor extends AbstractConstructor implements IGetWorldWorldList {
  constructor() {
    super(new RepositoryFactory().createRepository('world'));
  }

  async create(entity: AbstractWorld): Promise<string> {
    const exitedWorlds = await this.list({
      pagination: { count: 1, page: 1 },
      queryParams: {
        plotId: entity.plotId,
        type: entity.type,
      },
    });

    if (exitedWorlds.length) {
      throw new RuleError({
        code: 'ENTITY_DUPLICATION',
        payload: {
          entityId: entity.type,
          entityName: 'world',
        },
      });
    }

    return super.create(entity);
  }

  async getWorldsByPlotId(id: string): Promise<AbstractWorld[]> {
    const result = await this.repository.list({
      pagination: {
        count: 5,
        page: 1,
      },
      queryParams: {
        plotId: id,
      },
    });

    return result as AbstractWorld[];
  }
}
