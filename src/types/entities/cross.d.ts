import { StatusEnum } from '../../constants/status.enum';
import { WorldEnum } from '../../constants/world.enum';

interface CrossWorldPlotDTO extends CommonEntityDTO {
  plotId: string;
  worldId: string;
  status: StatusEnum;
  type: WorldEnum;
}

interface CrossWorldLawDTO extends CommonEntityDTO {
  isBroken: boolean;
  lawId: string;
  worldId: string;
}
