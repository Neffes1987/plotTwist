import { CallTypeEnum } from '../../constants/call.enum';

interface CallDTO extends CommonEntityDTO {
  name: string;
  description: string;
  partyMotivation: string;
  type: CallTypeEnum;
}
