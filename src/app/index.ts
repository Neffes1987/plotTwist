import { Controller } from './controllers/Controller';
import { CharacterConstructor } from './domain/use-cases/constructors/CharacterConstructor';
import { EdgeConstructor } from './domain/use-cases/constructors/EdgeConstructor';
import { LawsConstructor } from './domain/use-cases/constructors/LawsConstructor';
import { PlotConstructor } from './domain/use-cases/constructors/PlotConstructor';
import { RewardsConstructor } from './domain/use-cases/constructors/RewardsConstructor';
import { WaterholesConstructor } from './domain/use-cases/constructors/WaterholesConstructor';
import { WorldConstructor } from './domain/use-cases/constructors/WorldConstructor';

const plotConstructor = new PlotConstructor();
const lawConstructor = new LawsConstructor();
const waterholesConstructor = new WaterholesConstructor();
const edgeConstructor = new EdgeConstructor();
const rewardsConstructor = new RewardsConstructor();
const charactersConstructor = new CharacterConstructor();
const worldConstructor = new WorldConstructor(lawConstructor, waterholesConstructor, edgeConstructor);

export const appController = new Controller(
  plotConstructor,
  worldConstructor,
  lawConstructor,
  waterholesConstructor,
  edgeConstructor,
  rewardsConstructor,
  charactersConstructor,
);
