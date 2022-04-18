import {IAbstractModel} from '../base/abstractModel';
import {IListQuery} from '../base/abstractRepository';
import {
  CallModel,
  CallStatus,
  ICallModel,
} from '../models/challenge/call/callModel';
import {IChallengeModel} from '../models/challenge/chellenge/challengeModel';
import {IRewardModel} from '../models/challenge/reward/rewardModel';
import {ICharacterModel} from '../models/character/character/characterModel';
import {IPlotModel, PlotModel} from '../models/plot/plot/plotModel';
import {IWaterholeModel} from '../models/waterhole/waterhole/waterholeModel';
import {ILawModel} from '../models/world/law/lawModel';
import {
  ICommonWorld,
  WorldModel,
  WorldStatus,
} from '../models/world/world/worldModel';

import {ServiceMediator} from './serviceMediator';

export class PlotController {
  static readonly PAGE = 1;
  static readonly LIMIT = 20;
  readonly _mediator = new ServiceMediator();

  get mediator(): ServiceMediator {
    return this._mediator;
  }

  getPlotsList(data: IListQuery): Promise<PlotModel[]> {
    return this.mediator.plotService.getPlotsList(
      data.page ?? PlotController.PAGE,
      data.limit ?? PlotController.LIMIT,
    );
  }

  getPlot(plotId: string): Promise<PlotModel> {
    return this.mediator.plotService.getPlot(plotId);
  }

  createPlot(data: IPlotModel): Promise<string> {
    return this.mediator.plotService.createPlot(data);
  }

  updatePlot(data: IPlotModel): Promise<boolean> {
    return this.mediator.plotService.updatePlot(data);
  }

  removePlot(plotId: string): Promise<boolean> {
    return this.mediator.plotService.removePlot(plotId);
  }

  getWorld(worldId: string): Promise<Nullable<WorldModel>> {
    return this.mediator.worldService.getWorld(worldId);
  }

  createWorld(data: ICommonWorld) {
    return this.mediator.worldService.createWorld(data);
  }

  updateWorld(data: ICommonWorld) {
    return this.mediator.worldService.updateWorld(data);
  }

  activateWorld(worldId: string, worldState: WorldStatus): Promise<boolean> {
    return this.mediator.worldService.activateWorld(worldId, worldState);
  }

  getRewards(page: number, limit: number, challengeIds: string[]) {
    return this.mediator.challengeService.getRewards(page, limit, challengeIds);
  }

  getReward(rewardId: string) {
    return this.mediator.challengeService.getReward(rewardId);
  }

  createReward(data: IRewardModel) {
    return this.mediator.challengeService.createReward(data);
  }

  updateReward(data: IRewardModel) {
    return this.mediator.challengeService.updateReward(data);
  }

  removeReward(rewardId: string) {
    return this.mediator.challengeService.removeReward(rewardId);
  }

  getLawsList(worldId: string) {
    return this.mediator.worldService.getLawsList(worldId);
  }

  getLaw(lawId: string) {
    return this.mediator.worldService.getLaw(lawId);
  }

  createLaw(data: ILawModel) {
    return this.mediator.worldService.createLaw(data);
  }

  updateLaw(data: ILawModel): Promise<boolean> {
    return this.mediator.worldService.updateLaw(data);
  }

  removeLaw(lawId: string): Promise<boolean> {
    return this.mediator.worldService.removeLaw(lawId);
  }

  getCallsList(
    page: number,
    limit: number,
    challengeIds: string[],
  ): CallModel[] {
    return this.mediator.challengeService.getCallsList(
      page,
      limit,
      challengeIds,
    );
  }

  getCall(callId: string) {
    return this.mediator.challengeService.getCall(callId);
  }

  createCall(data: ICallModel) {
    return this.mediator.challengeService.createCall(data);
  }

  updateCall(data: ICallModel) {
    return this.mediator.challengeService.updateCall(data);
  }

  activateCall(callId: string, callStatus: CallStatus) {
    return this.mediator.challengeService.activateCall(callId, callStatus);
  }

  removeCall(callId: string): boolean {
    return this.mediator.challengeService.removeCall(callId);
  }

  assignCallToMessenger(callId: string, characterId: string): boolean {
    return this.mediator.characterService.assignCallToMessenger(
      callId,
      characterId,
    );
  }

  assignLawToMentor(lawId: string, characterId: string): boolean {
    return this.mediator.characterService.assignLawToMentor(lawId, characterId);
  }

  getCharactersList(page: number, limit: number, queries: string) {
    return this.mediator.characterService.getCharactersList(
      page,
      limit,
      queries,
    );
  }

  getCharacter(characterId: string) {
    return this.mediator.characterService.getCharacter(characterId);
  }

  assignResultForCharacters(resultId: string, characterIds: string[]): boolean {
    return this.mediator.characterService.assignResultForCharacters(
      resultId,
      characterIds,
    );
  }

  createCharacter(data: ICharacterModel) {
    return this.mediator.characterService.createCharacter(data);
  }

  updateCharacter(data: ICharacterModel): boolean {
    return this.mediator.characterService.updateCharacter(data);
  }

  removeCharacter(characterId: string): boolean {
    return this.mediator.characterService.removeCharacter(characterId);
  }

  addResult(data: IAbstractModel) {
    this.mediator.characterService.addResult(data);
  }

  removeResult(resultId: string): boolean {
    return this.mediator.characterService.removeResult(resultId);
  }

  updateResult(data: IAbstractModel): boolean {
    return this.mediator.characterService.updateResult(data);
  }

  getResult(resultId: string) {
    return this.mediator.characterService.getResult(resultId);
  }

  getResults(page: number, limit: number, queries: string) {
    return this.mediator.characterService.getResults(page, limit, queries);
  }

  createChallenge(data: IChallengeModel) {
    return this.mediator.challengeService.createChallenge(data);
  }

  updateChallenge(data: IChallengeModel): boolean {
    return this.mediator.challengeService.updateChallenge(data);
  }

  getChallenge(challengeId: string) {
    return this.mediator.challengeService.getChallenge(challengeId);
  }

  getChallengesList(page: number, limit: number) {
    return this.mediator.challengeService.getChallengesList(page, limit);
  }

  toggleChallenge(challengeId: string, isPassed: boolean): boolean {
    return this.mediator.challengeService.toggleChallenge(
      challengeId,
      isPassed,
    );
  }

  removeChallenge(challengeId: string): boolean {
    return this.mediator.challengeService.removeChallenge(challengeId);
  }

  getWaterholesList(page: number, limit: number) {
    return this.mediator.waterholeService.getWaterholesList(page, limit);
  }

  getWaterhole(waterholeId: string) {
    return this.mediator.waterholeService.getWaterhole(waterholeId);
  }

  createWaterhole(data: IWaterholeModel) {
    return this.mediator.waterholeService.createWaterhole(data);
  }

  updateWaterhole(data: IWaterholeModel): Promise<boolean> {
    return this.mediator.waterholeService.updateWaterhole(data);
  }

  removeWaterhole(waterholeId: string): Promise<boolean> {
    return this.mediator.waterholeService.removeWaterhole(waterholeId);
  }
}
