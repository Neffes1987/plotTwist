import { Controller } from './controllers/Controller';
import { CallsConstructor } from './domain/use-cases/constructors/CallsConstructor';
import { CharacterConstructor } from './domain/use-cases/constructors/CharacterConstructor';
import { CrossWorldCharacterConstructor } from './domain/use-cases/constructors/cross/CrossWorldCharacterConstructor';
import { LawsConstructor } from './domain/use-cases/constructors/LawsConstructor';
import { PlotConstructor } from './domain/use-cases/constructors/PlotConstructor';
import { RewardsConstructor } from './domain/use-cases/constructors/RewardsConstructor';
import { TaskConstructor } from './domain/use-cases/constructors/TaskConstructor';
import { WaterholesConstructor } from './domain/use-cases/constructors/WaterholesConstructor';
import { WorldConstructor } from './domain/use-cases/constructors/WorldConstructor';

const plotConstructor = new PlotConstructor();
const lawConstructor = new LawsConstructor();
const waterholesConstructor = new WaterholesConstructor();
const taskConstructor = new TaskConstructor();
const rewardsConstructor = new RewardsConstructor();
const charactersConstructor = new CharacterConstructor();
const callsConstructor = new CallsConstructor();
const worldConstructor = new WorldConstructor(lawConstructor, waterholesConstructor);
const crossWorldCharactersConstructor = new CrossWorldCharacterConstructor(charactersConstructor);

export const appController = new Controller(
  plotConstructor,
  worldConstructor,
  lawConstructor,
  waterholesConstructor,
  taskConstructor,
  rewardsConstructor,
  charactersConstructor,
  callsConstructor,
  crossWorldCharactersConstructor,
);
