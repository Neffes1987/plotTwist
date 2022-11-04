import { StatusEnum } from '../../constants/status.enum';
import { ChaseTypeEnum, FinalTypeEnum, HolidayGetSwordTypeEnum, HolidayTypeEnum, PotionTypeEnum, WorldEnum } from '../../constants/world.enum';

import { CrossWorldEdgeDTO } from './cross';
import { EdgeDTO } from './edge';

interface WorldDTO extends CommonEntityDTO {
  name: string;
  type: WorldEnum;
  status?: StatusEnum;
  story: string;
  reference: string;
  timeline: string;
  failPrice: string;
}

interface PlainWorldDTO extends WorldDTO {
  introduction: string;
}

interface PrivateWorldDTO extends WorldDTO {
  contrast: string;
}

interface HiddenCaveWorldDTO extends WorldDTO {
  mainEdgeInformation: string;
  shadowIntroduction: string;
  partyPlan: string;
}

interface HolidayWorldDTO extends WorldDTO {
  shadowRevenge: string;
  holidayType: HolidayTypeEnum;
  holidayGetSwordType?: HolidayGetSwordTypeEnum;
  chase?: ChaseTypeEnum;
}

interface ReturnWithPotionWorldDTO extends WorldDTO {
  finalType: FinalTypeEnum;
  potionType: PotionTypeEnum;
  cliffhanger: string;
}

interface ActivePlotWorld {
  worldData: WorldDTO;
  laws: LawInWorldDTO[];
  waterholes: WaterholeInWorldDTO[];
  edge?: ActiveWorldEdge;
}

type ActiveWorldEdge = EdgeDTO & Omit<CrossWorldEdgeDTO, 'id' | 'worldId', 'edgeId'>;
