import { createEntity } from '../../../entities/createEntity';
import { Law } from '../../../entities/Law/Law';
import { WorldLawRelation } from '../../../entities/WorldLawRelation/WorldLawRelation';
import { Repository } from '../../../repositories/Repository/Repository';
import { createRepository } from '../../../repositories/RepositoryFactory/RepositoryFactory';
import { AbstractConstructor } from '../AbstractConstructor/AbstractConstructor';

export class LawsConstructor extends AbstractConstructor {
  private readonly worldRelationsRepository: Repository;

  constructor() {
    super(createRepository('laws'));

    this.worldRelationsRepository = createRepository('worldLawRelation');
  }

  async getLawsForWorlds(worldIds: string[]): Promise<Law[]> {
    const relatedLaws = (await this.worldRelationsRepository.list({
      pagination: {
        count: 100,
        page: 1,
      },
      queryParams: {
        worldId: worldIds,
      },
    })) as WorldLawRelation[];

    const relatedLawsSet: Record<string, boolean> = {};

    relatedLaws.forEach(relatedLaw => {
      relatedLawsSet[relatedLaw.lawId] = relatedLaw.isBroken;
    });

    const laws = (await this.list({
      pagination: {
        count: 100,
        page: 1,
      },
      queryParams: {
        id: Object.keys(relatedLawsSet),
      },
    })) as Law[];

    return laws.map(law => {
      law.isBroken = relatedLawsSet[law.id];

      return law;
    });
  }

  async addLawsToWorld(lawIds: string[], worldId: string): Promise<boolean> {
    const bunch = lawIds.map(lawId => {
      const worldLawRelation = createEntity('worldLawRelation') as WorldLawRelation;

      worldLawRelation.setLawId(lawId);
      worldLawRelation.setWorldIs(worldId);

      return this.create(worldLawRelation);
    });

    await Promise.all(bunch);

    return true;
  }

  async removeLawsFromWorld(relationIds: string[]): Promise<boolean> {
    const bunch = relationIds.map(id => {
      return this.delete(id);
    });

    await Promise.all(bunch);

    return true;
  }

  async updateLawStatus(relationId: string, isBroken: boolean): Promise<boolean> {
    const worldLawRelation = await this.get(relationId);

    if (worldLawRelation instanceof WorldLawRelation) {
      worldLawRelation.isBroken = isBroken;

      return this.update(worldLawRelation);
    }

    return false;
  }
}
