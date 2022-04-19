describe('challengeService', () => {
  describe('challenge', () => {
    describe('WHEN "removeChallenge" is called', () => {
      it('AND type of challenge is "edge", MUST return ui error', () => {});

      it('AND type of challenge is "mainEdge", MUST return ui error', () => {});

      describe('AND type of challenge is "challenge"', () => {
        it('AND quantity of challenge is less then threshold, MUST return ui error', () => {});

        it('AND quantity of challenge is more then threshold, MUST return boolean value', () => {});
      });
    });

    describe('WHEN "toggleChallenge" is called', () => {
      it('MUST update data in repository', () => {});

      it('MUST update world data in repository', () => {});

      it('MUST return boolean value', () => {});
    });

    describe('WHEN "getChallengesList" is called', () => {
      it('MUST get list from repository', () => {});

      it('MUST return list of challenges', () => {});
    });

    describe('WHEN "getChallenge" is called', () => {
      it('MUST get data from repository', () => {});

      it('MUST return challenges data', () => {});
    });

    describe('WHEN "updateChallenge" is called', () => {
      it('MUST convert input data to model', () => {});

      it('MUST update data in repository', () => {});

      it('MUST return boolean value', () => {});
    });

    describe('WHEN "createChallenge" is called', () => {
      it('MUST convert input data to model', () => {});

      it('MUST generate id for model', () => {});

      it('MUST update data in repository', () => {});

      it('MUST return challenge id', () => {});
    });
  });

  describe('call', () => {
    describe('WHEN "activateCall" is called', () => {
      it('MUST get call data from repository', () => {});

      it('MUST change challenge weight by call status', () => {});

      it('MUST update call data in repository', () => {});

      it('MUST return boolean value', () => {});
    });

    describe('WHEN "updateCall" is called', () => {
      it('MUST convert input data to model', () => {});

      it('MUST update data in repository', () => {});

      it('MUST return boolean value', () => {});
    });

    describe('WHEN "createCall" is called', () => {
      it('MUST convert input data to model', () => {});

      it('MUST generate id for model', () => {});

      it('MUST update data in repository', () => {});

      it('MUST return call id', () => {});
    });

    describe('WHEN "removeCall" is called', () => {
      it('AND call is assigned to messenger, MUST return ui error', () => {});

      it('AND call is assigned to challenge, MUST return ui error', () => {});

      it('MUST remove call from repository', () => {});

      it('MUST return boolean value', () => {});
    });

    describe('WHEN "getCall" is called', () => {
      it('MUST get data from repository', () => {});

      it('MUST return call data', () => {});
    });

    describe('WHEN "getCallsList" is called', () => {
      it('MUST get list from repository', () => {});

      it('MUST return calls list', () => {});
    });
  });

  describe('rewards', () => {
    describe('WHEN "removeReward" is called', () => {
      it('AND reward is assigned to mentor, MUST return ui error', () => {});

      it('AND reward is assigned to edge, MUST return ui error', () => {});

      it('AND reward is assigned to character, MUST return ui error', () => {});

      it('MUST remove data from repository', () => {});

      it('MUST return boolean value', () => {});
    });

    describe('WHEN "updateReward" is called', () => {
      it('MUST convert input data to model', () => {});

      it('MUST update data in repository', () => {});

      it('MUST return reward id', () => {});
    });

    describe('WHEN "createReward" is called', () => {
      it('MUST convert input data to model', () => {});

      it('MUST generate id for model', () => {});

      it('MUST update data in repository', () => {});

      it('MUST return reward id', () => {});
    });

    describe('WHEN "getReward" is called', () => {
      it('MUST get data from repository', () => {});

      it('MUST return reward data', () => {});
    });

    describe('WHEN "getRewards" is called', () => {
      it('MUST get list from repository', () => {});

      it('MUST return rewards list', () => {});
    });
  });
});
