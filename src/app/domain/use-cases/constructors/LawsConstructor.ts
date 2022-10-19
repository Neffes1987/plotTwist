import { ILawConstructor } from '../../../../types/constructors/law.constructor';
import { CrossWorldLaw } from '../../entities/Cross/CrossWorldLaw/CrossWorldLaw';
import { Law } from '../../entities/Law/Law';

export class LawsConstructor implements ILawConstructor {
  async delete(id: string): Promise<boolean> {
    const crossWorldLaw = new CrossWorldLaw();

    await crossWorldLaw.loadByLawId(id);
    await crossWorldLaw.remove();

    const law = new Law(id);

    return law.remove();
  }

  async get(id: string): Promise<Nullable<LawDTO>> {
    const law = new Law(id);

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

    await law.save();

    return law.id;
  }

  async toggleWorldLawRelation(lawId: string, worldId: string): Promise<boolean> {
    const crossWorldLaw = new CrossWorldLaw();

    await crossWorldLaw.loadByLawId(lawId);

    if (crossWorldLaw.worldId) {
      await crossWorldLaw.remove();
    } else {
      crossWorldLaw.worldId = worldId;
      crossWorldLaw.lawId = lawId;
      crossWorldLaw.isBroken = false;

      await crossWorldLaw.save();
    }

    return true;
  }

  async toggleWorldLawStatus(lawId: string, isBroken: boolean): Promise<boolean> {
    const crossWorldLaw = new CrossWorldLaw();

    await crossWorldLaw.loadByLawId(lawId);
    crossWorldLaw.isBroken = isBroken;

    await crossWorldLaw.save();

    return true;
  }
}
