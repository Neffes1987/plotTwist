import { IAbstractModel } from '../base/abstractModel';
import { IListQuery } from '../base/abstractRepository';
import { CallModel, CallStatus, ICallModel } from '../models/challenge/call/callModel';
import { ChallengeModel, IChallengeModel } from '../models/challenge/challenge/challengeModel';
import { IRewardModel, RewardModel } from '../models/challenge/reward/rewardModel';
import { CharacterModel, ICharacterModel } from '../models/character/character/characterModel';
import { ICharacterListQuery } from '../models/character/character/characterRepository';
import { ResultModel } from '../models/character/result/resultModel';
import { IPlotModel, PlotModel } from '../models/plot/plot/plotModel';
import { IWaterholeModel, WaterholeModel } from '../models/waterhole/waterhole/waterholeModel';
import { ILawModel, LawModel } from '../models/world/law/lawModel';
import { ICommonWorld, WorldModel, WorldStatus } from '../models/world/world/worldModel';

import { ServiceMediator } from './serviceMediator';

class PlotController {
  static readonly PAGE = 1;
  static readonly LIMIT = 20;
  readonly _mediator = new ServiceMediator();

  get mediator(): ServiceMediator {
    return this._mediator;
  }

  async getPlotsList(data: IListQuery): Promise<PlotModel[]> {
    return this.mediator.plotService.getPlotsList(data.page ?? PlotController.PAGE, data.limit ?? PlotController.LIMIT);
  }

  async getPlot(plotId: string): Promise<PlotModel> {
    return this.mediator.plotService.getPlot(plotId);
  }

  async createPlot(data: IPlotModel): Promise<string> {
    return this.mediator.plotService.createPlot(data);
  }

  async updatePlot(data: IPlotModel): Promise<boolean> {
    return this.mediator.plotService.updatePlot(data);
  }

  async removePlot(plotId: string): Promise<boolean> {
    return this.mediator.plotService.removePlot(plotId);
  }

  async getWorld(worldId: string): Promise<Nullable<WorldModel>> {
    return this.mediator.worldService.getWorld(worldId);
  }

  async createWorld(data: ICommonWorld): Promise<string> {
    return this.mediator.worldService.createWorld(data);
  }

  async updateWorld(data: ICommonWorld): Promise<boolean> {
    return this.mediator.worldService.updateWorld(data);
  }

  async activateWorld(worldId: string, worldState: WorldStatus): Promise<boolean> {
    return this.mediator.worldService.activateWorld(worldId, worldState);
  }

  async getRewards(props: IListQuery): Promise<RewardModel[]> {
    return this.mediator.challengeService.getRewards(props);
  }

  async getReward(rewardId: string): Promise<Nullable<RewardModel>> {
    return this.mediator.challengeService.getReward(rewardId);
  }

  async createReward(data: IRewardModel): Promise<string> {
    return this.mediator.challengeService.createReward(data);
  }

  async updateReward(data: IRewardModel): Promise<boolean> {
    return this.mediator.challengeService.updateReward(data);
  }

  async removeReward(rewardId: string): Promise<boolean> {
    return this.mediator.challengeService.removeReward(rewardId);
  }

  async getLawsList(worldId: string): Promise<LawModel[]> {
    return this.mediator.worldService.getLawsList(worldId);
  }

  async getLaw(lawId: string): Promise<Nullable<LawModel>> {
    return this.mediator.worldService.getLaw(lawId);
  }

  async createLaw(data: ILawModel): Promise<string> {
    return this.mediator.worldService.createLaw(data);
  }

  async updateLaw(data: ILawModel): Promise<boolean> {
    return this.mediator.worldService.updateLaw(data);
  }

  async removeLaw(lawId: string): Promise<boolean> {
    return this.mediator.worldService.removeLaw(lawId);
  }

  async getCallsList(props: IListQuery): Promise<CallModel[]> {
    return this.mediator.challengeService.getCallsList(props);
  }

  async getCall(callId: string): Promise<Nullable<CallModel>> {
    return this.mediator.challengeService.getCall(callId);
  }

  async createCall(data: ICallModel): Promise<string> {
    return this.mediator.challengeService.createCall(data);
  }

  async updateCall(data: ICallModel): Promise<boolean> {
    return this.mediator.challengeService.updateCall(data);
  }

  async activateCall(callId: string, callStatus: CallStatus): Promise<boolean> {
    return this.mediator.challengeService.activateCall(callId, callStatus);
  }

  async removeCall(callId: string): Promise<boolean> {
    return this.mediator.challengeService.removeCall(callId);
  }

  async assignCallToMessenger(callId: string, characterIds: string[]): Promise<boolean> {
    return this.mediator.characterService.assignCallToMessenger(callId, characterIds);
  }

  async assignLawToMentor(lawId: string, characterIds: string[]): Promise<boolean> {
    return this.mediator.characterService.assignLawToMentors(lawId, characterIds);
  }

  async getCharactersList(props: ICharacterListQuery): Promise<CharacterModel[]> {
    return this.mediator.characterService.getCharactersList(props);
  }

  async getCharacter(characterId: string): Promise<Nullable<CharacterModel>> {
    return this.mediator.characterService.getCharacter(characterId);
  }

  async assignResultForCharacters(resultId: string, characterIds: string[]): Promise<boolean> {
    return this.mediator.characterService.assignResultForCharacters(resultId, characterIds);
  }

  async createCharacter(data: ICharacterModel): Promise<string> {
    return this.mediator.characterService.createCharacter(data);
  }

  async updateCharacter(data: ICharacterModel): Promise<boolean> {
    return this.mediator.characterService.updateCharacter(data);
  }

  async removeCharacter(characterId: string): Promise<boolean> {
    return this.mediator.characterService.removeCharacter(characterId);
  }

  async addResult(data: IAbstractModel): Promise<string> {
    return this.mediator.characterService.addResult(data);
  }

  async removeResult(resultId: string): Promise<boolean> {
    return this.mediator.characterService.removeResult(resultId);
  }

  async updateResult(data: IAbstractModel): Promise<boolean> {
    return this.mediator.characterService.updateResult(data);
  }

  async getResult(resultId: string): Promise<Nullable<ResultModel>> {
    return this.mediator.characterService.getResult(resultId);
  }

  async getResults(props: IListQuery): Promise<ResultModel[]> {
    return this.mediator.characterService.getResults(props);
  }

  async createChallenge(data: IChallengeModel): Promise<string> {
    return this.mediator.challengeService.createChallenge(data);
  }

  async updateChallenge(data: IChallengeModel): Promise<boolean> {
    return this.mediator.challengeService.updateChallenge(data);
  }

  async getChallenge(challengeId: string): Promise<Nullable<ChallengeModel>> {
    return this.mediator.challengeService.getChallenge(challengeId);
  }

  async getChallengesList(props: IListQuery): Promise<ChallengeModel[]> {
    return this.mediator.challengeService.getChallengesList(props);
  }

  async toggleChallenge(challengeId: string, isPassed: boolean): Promise<boolean> {
    return this.mediator.challengeService.toggleEdgeStatus(challengeId, isPassed);
  }

  async removeChallenge(challengeId: string): Promise<boolean> {
    return this.mediator.challengeService.removeChallenge(challengeId);
  }

  async getWaterholesList(worldId: string): Promise<WaterholeModel[]> {
    return this.mediator.waterholeService.getWaterholesList(worldId);
  }

  async getWaterhole(waterholeId: string): Promise<Nullable<WaterholeModel>> {
    return this.mediator.waterholeService.getWaterhole(waterholeId);
  }

  async createWaterhole(data: IWaterholeModel): Promise<string> {
    return this.mediator.waterholeService.createWaterhole(data);
  }

  async updateWaterhole(data: IWaterholeModel): Promise<boolean> {
    return this.mediator.waterholeService.updateWaterhole(data);
  }

  async removeWaterhole(waterholeId: string): Promise<boolean> {
    return this.mediator.waterholeService.removeWaterhole(waterholeId);
  }
}

export const plotController = new PlotController();
