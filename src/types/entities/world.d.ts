import { StatusEnum } from '../../constants/status.enum';
import { ChaseTypeEnum, FinalTypeEnum, HolidayGetSwordTypeEnum, HolidayTypeEnum, PotionTypeEnum, WorldEnum } from '../../constants/world.enum';

import { CharacterInWorldDTO } from './character';
import { CrossWorldEdgeDTO } from './cross';
import { EdgeDTO } from './edge';

interface PlainWorldDTO {
  introduction: string;
}

interface PrivateWorldDTO {
  contrast: string;
}

interface HiddenCaveWorldDTO {
  mainEdgeInformation: string;
  shadowIntroduction: string;
  partyPlan: string;
}

interface HolidayWorldDTO {
  shadowRevenge: string;
  holidayType: HolidayTypeEnum;
  holidayGetSwordType?: HolidayGetSwordTypeEnum;
  chase?: ChaseTypeEnum;
}

interface ReturnWithPotionWorldDTO {
  finalType: FinalTypeEnum;
  potionType: PotionTypeEnum;
  cliffhanger: string;
}

interface WorldDTO extends CommonEntityDTO, PlainWorldDTO, PrivateWorldDTO, HiddenCaveWorldDTO, HolidayWorldDTO, ReturnWithPotionWorldDTO {
  name: string;
  type: WorldEnum;
  status?: StatusEnum;
  story: string;
  reference: string;
  timeline: string;
  failPrice: string;
}

interface ActivePlotWorld {
  worldData: WorldDTO;
  laws: LawInWorldDTO[];
  characters: CharacterInWorldDTO[];
  waterholes: WaterholeInWorldDTO[];
  edge?: ActiveWorldEdge;
}

type ActiveWorldEdge = EdgeDTO & Omit<CrossWorldEdgeDTO, 'id' | 'worldId', 'edgeId'>;
