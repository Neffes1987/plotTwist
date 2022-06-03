import { ICharacterModel, PlotInfoResponse } from '@backend';

import { ChallengeService } from '../models/challenge/challengeService';
import { CharacterModel } from '../models/character/character/characterModel';
import { CharacterService } from '../models/character/characterService';
import { PlotService } from '../models/plot/plotService';
import { WaterholeService } from '../models/waterhole/waterholeService';
import { WorldService } from '../models/world/worldService';

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

  async getPlotInfo(plotId: string): Promise<PlotInfoResponse> {
    const [plot, worlds, characters] = await Promise.all([
      this.plotService.getPlotDTO(plotId),
      this.worldService.getWorldsInfo(plotId),
      this.characterService.getCharactersList({ plotId }),
    ]);

    return {
      plot,
      worlds,
      characters: characters?.map((character: CharacterModel) => character.serialize() as ICharacterModel),
    };
  }
}
