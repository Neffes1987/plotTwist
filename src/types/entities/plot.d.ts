import { StatusEnum } from '../../constants/status.enum';

import { ActivePlotWorld } from './world';

interface PlotDTO extends CommonEntityDTO {
  name: string;
  status: StatusEnum;
}

interface ActivePlotDTO {
  plotData: PlotDTO;
  worlds: ActivePlotWorld[];
}
