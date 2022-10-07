import { LawsConstructor } from '../domain/rulles/Constructors/LawsConstructor/LawsConstructor';
import { PlotConstructor } from '../domain/rulles/Constructors/PlotConstructor/PlotConstructor';

import { Controller } from './Controller/Controller';
import { ControllerType, ICommonController } from './interface';
import { WorldController } from './WorldController/WorldController';

export function controllerFactory(type: ControllerType): ICommonController {
  switch (type) {
    case 'plot':
      return new Controller(new PlotConstructor(), type);
    case 'law':
      return new Controller(new LawsConstructor(), type);
    case 'world':
      return new WorldController();
  }
}
