import { RuleError } from '../RuleError';

describe('RuleError', () => {
  const config = {
    payload: { entityId: 'string', entityName: 'name' },
    code: 'ENTITY_DUPLICATION' as const,
  };

  const error = new RuleError(config);

  describe('WHEN new error is created', () => {
    it('MUST set "message" as "RULE_ERROR"', () => {
      expect(error.message).toEqual('RULE_ERROR');
    });

    it('MUST set provided payload to "errorPayload"', () => {
      expect(error.errorPayload).toEqual(config);
    });
  });
});
