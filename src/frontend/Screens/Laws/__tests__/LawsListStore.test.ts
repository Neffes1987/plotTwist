import { ILawsController } from 'backend';

import { lawsListStore } from '../LawsListStore';

const LawsControllerMock: ILawsController = {
  addLawsToWorld: jest.fn(),
  changeLawStatus: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  get: jest.fn(),
  list: jest.fn(),
  removeLawsFromWorld: jest.fn(),
  update: jest.fn(),
};

describe('WHEN "LawsListStore" is called', () => {
  Object.defineProperty(lawsListStore, '', {
    writable: true,
    value: LawsControllerMock,
  });

  describe('AND "list" is called', () => {
    it('MUST call "lawsController.list"', () => {});

    it('MUST update "laws"', () => {});
  });

  describe('AND "toggleWorldLaw" is called', () => {
    describe('AND "law" in world', () => {
      it('MUST call "lawsController.addLawsToWorld"', () => {});

      it('MUST update "laws"', () => {});
    });

    describe('AND "law" not in world', () => {
      it('MUST call "lawsController.removeLawsFromWorld"', () => {});

      it('MUST update "laws"', () => {});
    });
  });

  describe('AND "toggleLawStatus" is called', () => {
    it('MUST call "lawsController.changeLawStatus"', () => {});

    it('MUST update "laws"', () => {});
  });

  describe('AND "update" is called', () => {
    it('MUST call "lawsController.update"', () => {});

    it('MUST call "lawsController.list"', () => {});
  });

  describe('AND "delete" is called', () => {
    it('MUST call "lawsController.delete"', () => {});

    it('MUST call "lawsController.list"', () => {});
  });

  describe('AND "create" is called', () => {
    it('MUST call "lawsController.create"', () => {});

    it('MUST call "lawsController.list"', () => {});
  });
});
