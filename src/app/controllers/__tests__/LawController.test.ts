import { LawController } from '../LawController/LawController';

const mocks = {
  addLawsToWorld: jest.fn(),
  removeLawsFromWorld: jest.fn(),
  updateLawStatus: jest.fn(),
};

describe('WHEN "LawController" is created', () => {
  const controller = new LawController();

  Object.defineProperty(controller, 'builder', {
    value: mocks,
    writable: true,
  });

  it('AND "addLaws" is called, MUST call "builder.addLawsToWorld"', async () => {
    await controller.addLawsToWorld(['test-law-id'], 'test-world-id');

    expect(mocks.addLawsToWorld).toHaveBeenCalledWith(['test-law-id'], 'test-world-id');
  });

  it('AND "changeLawStatus" is called, MUST call "builder.changeLawStatus"', async () => {
    await controller.changeLawStatus('test-law-id', true);

    expect(mocks.updateLawStatus).toHaveBeenCalledWith('test-law-id', true);
  });

  it('AND "removeLawsFromWorld" is called, MUST call "builder.removeLawsFromWorld"', async () => {
    await controller.removeLawsFromWorld(['test-law-id']);

    expect(mocks.removeLawsFromWorld).toHaveBeenCalledWith(['test-law-id']);
  });
});
