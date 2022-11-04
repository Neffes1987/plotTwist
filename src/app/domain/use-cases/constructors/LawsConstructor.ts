import { ILawConstructor } from '../../../../types/constructors/law.constructor';
import { CrossWorldLaw } from '../../entities/Cross/CrossWorldLaw/CrossWorldLaw';
import { Law } from '../../entities/Law/Law';

export class LawsConstructor implements ILawConstructor {
  async delete(id: string): Promise<boolean> {
    const crossWorldLaw = new CrossWorldLaw();

    await crossWorldLaw.loadByLawId(id);
    await crossWorldLaw.remove();

    const law = new Law();

    law.id = id;

    return law.remove();
  }

  async get(id: string): Promise<Nullable<LawDTO>> {
    const law = new Law();

    law.id = id;

    await law.load();

    return law.serialize();
  }

  list(params: ListParams<LawDTO>): Promise<LawDTO[]> {
    const law = new Law();

    return law.list(params);
  }

  async save(dto: LawDTO): Promise<string> {
    const law = new Law();

    law.unSerialize(dto);

    law.id = await law.save();

    return law.id;
  }

  async getWorldLaws(worldId: string): Promise<LawInWorldDTO[]> {
    const crossWorldLaw = new CrossWorldLaw();
    const law = new Law();

    const crossWorldLawList = await crossWorldLaw.listByWorldId(worldId);
    const lawIsBroken: Record<string, boolean> = {};

    crossWorldLawList.forEach(({ lawId, isBroken }) => {
      lawIsBroken[lawId] = isBroken;
    });

    const commonLaws = await law.list({
      query: {
        id: Object.keys(lawIsBroken),
      },
    });

    return commonLaws.map(law => ({ ...law, isBroken: lawIsBroken[law.id] }));
  }
}
