import { DTOConverter } from '../domain/DTOConverter/DTOConverter';
import { PlotConstructor } from '../domain/rulles/Constructors/PlotConstructor/PlotConstructor';
import { WorldConstructor } from '../domain/rulles/Constructors/WorldConstructor/WorldConstructor';

import { Controller } from './Controller/Controller';
import { ControllerType, ICommonController } from './interface';
import { LawController } from './LawController/LawController';

export function controllerFactory(type: ControllerType): ICommonController {
  switch (type) {
    case 'plot':
      return new Controller(new PlotConstructor(), new DTOConverter('plot'));
    case 'law':
      return new LawController();
    case 'world':
      return new Controller(new WorldConstructor(), new DTOConverter());
  }
}
