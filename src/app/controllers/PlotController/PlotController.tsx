import { PlotDTO } from '../../domain/entities/interface';
import { Plot } from '../../domain/entities/Plot/Plot';
import { PlotConstructor } from '../../domain/rulles/Constructors/PlotConstructor/PlotConstructor';
import { AbstractController } from '../AbstractController/AbstractController';
import { IPlotController } from '../interface';

export class PlotController extends AbstractController<PlotDTO, Omit<PlotDTO, 'worlds'>> implements IPlotController {
  constructor() {
    super(new PlotConstructor());
  }

  convertDTOtoEntity(dto: PlotDTO): Plot {
    const plot = new Plot();

    plot.unSerializeToEntity(dto);

    return plot;
  }
}
