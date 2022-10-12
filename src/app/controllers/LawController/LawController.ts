import { DTOConverter } from '../../domain/DTOConverter/DTOConverter';
import { LawsConstructor } from '../../domain/rulles/Constructors/LawsConstructor/LawsConstructor';
import { Controller } from '../Controller/Controller';
import { IWorldLawRelation } from '../interface';

export class LawController extends Controller implements IWorldLawRelation {
  constructor() {
    super(new LawsConstructor(), new DTOConverter('laws'));
  }

  async addLawsToWorld(lawIds: string[], worldId: string): Promise<boolean> {
    return (this.builder as LawsConstructor).addLawsToWorld(lawIds, worldId);
  }

  async changeLawStatus(lawId: string, isBroken: boolean): Promise<boolean> {
    return (this.builder as LawsConstructor).updateLawStatus(lawId, isBroken);
  }

  async removeLawsFromWorld(lawIds: string[]): Promise<boolean> {
    return (this.builder as LawsConstructor).removeLawsFromWorld(lawIds);
  }
}
