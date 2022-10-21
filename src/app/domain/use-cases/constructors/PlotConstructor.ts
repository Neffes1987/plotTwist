import { IPlotConstructor } from '../../../../types/constructors/plot.constructor';
import { PlotDTO } from '../../../../types/entities/plot';
import { Plot } from '../../entities/Plot/Plot';

export class PlotConstructor implements IPlotConstructor {
  async delete(id: string): Promise<boolean> {
    const plot = new Plot();

    plot.id = id;

    return plot.remove();
  }

  async get(plotId: string): Promise<PlotDTO> {
    const plot = new Plot();

    plot.id = plotId;

    await plot.load();

    return plot.serialize();
  }

  list(params: ListParams<PlotDTO>): Promise<PlotDTO[]> {
    const plot = new Plot();

    return plot.list(params);
  }

  async save(dto: PlotDTO): Promise<string> {
    const plot = new Plot();

    plot.unSerialize(dto);
    plot.id = await plot.save();

    return plot.id;
  }
}
