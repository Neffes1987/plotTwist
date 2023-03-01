import { CallEditor } from './Calls/Call';
import { Calls } from './Calls/Calls';
import { CharacterEditor } from './Characters/CharacterEditor/CharacterEditor';
import { CharactersList } from './Characters/CharactersList/CharactersList';
import { Home } from './Home/Home';
import { Laws } from './Laws/Laws';
import { Loading } from './Loading/Loading';
import { OopsErrorScreen } from './OopsErrorScreen/OopsErrorScreen';
import { ActivePlot } from './Plot/ActivePlot';
import { PlotList } from './Plot/PlotList';
import { Rewards } from './Rewards/Rewards';
import { TaskEditor } from './Tasks/TaskEditor';
import { TaskList } from './Tasks/TasksList';
import { Waterholes } from './Waterholes/Waterholes';
import { WorldEditor } from './WorldEditor/WorldEditor';

export const components = {
  Loading,
  Laws,
  Waterholes,
  Home,
  PlotList,
  Rewards,
  WorldEditor,
  Characters: CharactersList,
  OopsErrorScreen,
  ActivePlot,
  CharacterEditor,
  Calls,
  CallEditor,
  TaskList,
  TaskEditor,
};
