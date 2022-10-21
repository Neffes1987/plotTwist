import { Controller } from './controllers/Controller';
import { LawsConstructor } from './domain/use-cases/constructors/LawsConstructor';
import { PlotConstructor } from './domain/use-cases/constructors/PlotConstructor';
import { WaterholesConstructor } from './domain/use-cases/constructors/WaterholesConstructor';
import { WorldConstructor } from './domain/use-cases/constructors/WorldConstructor';

export const appController = new Controller(new PlotConstructor(), new WorldConstructor(), new LawsConstructor(), new WaterholesConstructor());
