import { AbstractWorld } from '../../../entities/World/AbstractWorld/AbstractWorld';
import { RepositoryFactory } from '../../../repositories/RepositoryFactory/RepositoryFactory';
import { AbstractConstructor } from '../AbstractConstructor/AbstractConstructor';
import { IGetWorldWorldList } from '../PlotConstructor/interface';

export class WorldConstructor extends AbstractConstructor implements IGetWorldWorldList {
  constructor() {
    super(new RepositoryFactory().createRepository('world'));
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
