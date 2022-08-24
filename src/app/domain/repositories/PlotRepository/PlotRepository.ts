import { PlotDTO } from 'backend';

import { Plot } from '../../entities/Plot/Plot';
import { AbstractRepository } from '../AbstractRepository/AbstractRepository';
import { IDataProvider, RawDataType } from '../AbstractRepository/interface';

export class PlotRepository extends AbstractRepository {
  constructor(dataProvider: IDataProvider) {
    super(dataProvider);
  }

  protected unSerializeToEntity(object: RawDataType): Plot {
    const plot = new Plot();

    plot.unSerializeToEntity((object as unknown) as PlotDTO);

    return plot;
  }
}
