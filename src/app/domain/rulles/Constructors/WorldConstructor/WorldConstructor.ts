import { RuleError } from '../../../../errors/RuleError';
import { Law } from '../../../entities/Law/Law';
import { AbstractWorld } from '../../../entities/World/AbstractWorld/AbstractWorld';
import { AbstractRepository } from '../../../repositories/AbstractRepository/AbstractRepository';
import { createRepository } from '../../../repositories/RepositoryFactory/RepositoryFactory';
import { AbstractConstructor } from '../AbstractConstructor/AbstractConstructor';
import { IGetWorldWorldList } from '../PlotConstructor/interface';

export class WorldConstructor extends AbstractConstructor implements IGetWorldWorldList {
  private readonly relationsRepository: AbstractRepository;

  constructor() {
    super(createRepository('world'));

    this.relationsRepository = createRepository('relation');
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
    const result = (await this.repository.list({
      pagination: {
        count: 5,
        page: 1,
      },
      queryParams: {
        plotId: id,
      },
    })) as AbstractWorld[];

    const laws = await this.getLawsForWorlds(result.map(({ id }) => id));

    return result.map(world => {
      const worldLaws = laws.filter(({ worldIds }) => worldIds?.includes(world.id));

      world.setLaws(worldLaws);

      return world;
    });
  }

  private async getLawsForWorlds(worldIds: string[]): Promise<Law[]> {
    return (await this.relationsRepository.list({
      pagination: {
        count: 100,
        page: 1,
      },
      queryParams: {
        fieldName: 'law',
        siblingId: worldIds,
        siblingName: 'world',
      },
    })) as Law[];
  }
}
