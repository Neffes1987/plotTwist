import { Plot } from '../../../entities/Plot/Plot';
import { ListParams } from '../../../interface';
import { RepositoryFactory } from '../../../repositories/RepositoryFactory/RepositoryFactory';
import { AbstractConstructor } from '../AbstractConstructor/AbstractConstructor';
import { WorldConstructor } from '../WorldConstructor/WorldConstructor';

import { IGetWorldWorldList } from './interface';

export class PlotConstructor extends AbstractConstructor {
  private readonly worldConstructor: IGetWorldWorldList;

  constructor() {
    super(new RepositoryFactory().createRepository('plot'));
    this.worldConstructor = new WorldConstructor();
  }

  async get(id: string): Promise<Nullable<Plot>> {
    const plot = (await this.repository.get(id)) as Plot;

    if (!plot) {
      return null;
    }

    const worlds = await this.worldConstructor.getWorldsByPlotId(plot.id);

    plot.setWorlds(worlds);

    return plot;
  }

  async list(params: ListParams): Promise<Plot[]> {
    const plots = await super.list(params);

    return plots as Plot[];
  }
}
