import { PlotStatus } from '../../entities/Plot/interface';
import { Plot } from '../../entities/Plot/Plot';
import { AbstractRepository } from '../AbstractRepository/AbstractRepository';
import { IDataProvider, RawDataType } from '../AbstractRepository/interface';

export class PlotRepository extends AbstractRepository {
  constructor(dataProvider: IDataProvider) {
    super(dataProvider);
  }

  protected serializeEntity(entity: Plot): RawDataType {
    return {
      name: entity.name,
      id: entity.id,
      description: entity.description,
      status: entity.status,
    };
  }

  protected unSerializeToEntity(object: RawDataType): Plot {
    const plot = new Plot();

    plot.setId(object.id as string);
    plot.setName(object.name as string);
    plot.setDescription(object.description as string);
    plot.setStatus(object.status as PlotStatus);

    return plot;
  }
}
