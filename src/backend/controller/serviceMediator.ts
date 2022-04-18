import {Command} from '../base/service/command';
import {ChallengeService} from '../models/challenge/challengeService';
import {CharacterService} from '../models/character/characterService';
import {PlotService} from '../models/plot/plotService';
import {WaterholeService} from '../models/waterhole/waterholeService';
import {WorldService} from '../models/world/worldService';

export enum ServiceType {
  world = 'world',
  plot = 'plot',
  character = 'character',
  challenge = 'challenge',
  waterhole = 'waterhole',
  mediator = 'mediator',
}

export class ServiceMediator {
  private readonly _worldService: WorldService;
  private readonly _plotService: PlotService;
  private readonly _waterholeService: WaterholeService;
  private readonly _characterService: CharacterService;
  private readonly _challengeService: ChallengeService;

  constructor() {
    this._worldService = new WorldService(this);
    this._characterService = new CharacterService(this);
    this._challengeService = new ChallengeService(this);
    this._waterholeService = new WaterholeService(this);
    this._plotService = new PlotService(this);
  }

  get worldService(): WorldService {
    return this._worldService;
  }

  get waterholeService(): WaterholeService {
    return this._waterholeService;
  }

  get plotService(): PlotService {
    return this._plotService;
  }

  get characterService(): CharacterService {
    return this._characterService;
  }

  get challengeService(): ChallengeService {
    return this._challengeService;
  }

  async sendCommand(command: Command): Promise<unknown> {
    switch (command.type) {
      case ServiceType.world:
        return this.worldService.executeCommand(command);
      case ServiceType.plot:
        return this.plotService.executeCommand(command);
      case ServiceType.challenge:
        return this.challengeService.executeCommand(command);
      case ServiceType.character:
        return this.characterService.executeCommand(command);
      case ServiceType.waterhole:
        return this.waterholeService.executeCommand(command);
      case ServiceType.mediator:
      default:
        return null;
    }
  }
}
