import { UxException } from './uxException';

export enum UnexpectedErrorCode {
  canNotRecognizeWorldType = 'can_not_recognize_world_type',
  canNotFindItemById = 'can_not_find_item_by_id',
  canNotUpdateItemByProvidedData = 'can_not_update_item_by_provided_data',
  canNotCreateItemByProvidedData = 'can_not_create_item_by_provided_data',
  canNotGetListByQuery = 'can_not_get_list_by_query',
  notEnoughChallenges = 'not_enough_challenges',
  edgeCanNotBeDeleted = 'edge_can_not_be_deleted',
  mainEdgeCanNotBeDeleted = 'main_edge_can_not_be_deleted',
  challengeNotFound = 'challenge_not_found',
  providedIdNotAChallenge = 'provided_id_is_not_for_challenge',
  unableToFindCallById = 'unable_to_find_call_by_id',
  challengeAssignedToThisCall = 'challenge_assigned_to_this_call',
  rewardAssignedToChallenge = 'reward_assigned_to_challenge',
}

export class ErrorLog {
  static validationError = 'validation_error';
  static emptyFields = 'empty_fields';
  static wrongFieldsValue = 'empty_fields';
  static unexpectedError = 'unexpected_error';

  add(error: Error): void {
    console.error(error);
  }

  formatUnexpectedError(message: UnexpectedErrorCode): UxException {
    return new UxException(ErrorLog.unexpectedError, {
      message: message.toString(),
    });
  }

  formatEmptyFieldsError(props: string[]): UxException {
    return new UxException(ErrorLog.emptyFields, { message: props.toString() });
  }

  formatWrongFieldsError(props: Record<string, string>): UxException {
    return new UxException(ErrorLog.wrongFieldsValue, props);
  }
}
