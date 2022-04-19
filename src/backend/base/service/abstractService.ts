import {ServiceMediator} from '../../controller/serviceMediator';
import {ErrorLog} from '../errors/errorLog';

export abstract class AbstractService {
  static cleanWorldDataOperation = 'cleanWorldData';

  private readonly _errorLog: ErrorLog;

  private readonly _mediator: ServiceMediator;

  protected constructor(mediator: ServiceMediator) {
    this._mediator = mediator;
    this._errorLog = new ErrorLog();
  }

  get mediator(): ServiceMediator {
    return this._mediator;
  }

  get errorLog(): ErrorLog {
    return this._errorLog;
  }
}
