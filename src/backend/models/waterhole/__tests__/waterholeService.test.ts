import { MOCKED_WATERHOLE, MOCKED_WATERHOLE_2 } from '@mocks/mockedWaterhole';
import { MOCKED_WORLD } from '@mocks/mockedWorld';

import { ServiceMediator } from '../../../controller/serviceMediator';
import { PlainWorldModel } from '../../world/world/plainWorldModel';
import { WaterholeModel } from '../waterhole/waterholeModel';
import { WaterholeRepository } from '../waterhole/waterholeRepository';

jest.mock('../waterhole/waterholeRepository');

describe('WaterholeService', () => {
  const mockedWaterholeRepository = new WaterholeRepository();
  const mediator = new ServiceMediator();
  const waterhole = new WaterholeModel(MOCKED_WATERHOLE);
  const world = new PlainWorldModel(MOCKED_WORLD);

  Object.defineProperty(mediator.waterholeService, '_waterholeRepository', {
    writable: true,
    value: mockedWaterholeRepository,
  });

  describe('waterhole', () => {
    describe('WHEN "getWaterholesList" is called', () => {
      beforeEach(() => {
        (mockedWaterholeRepository.list as jest.Mock).mockResolvedValue([waterhole]);
      });

      it('MUST call "WaterholeRepository.list"', async () => {
        await mediator.waterholeService.getWaterholesList(world.id);

        expect(mockedWaterholeRepository.list).toHaveBeenCalledWith(world.id);
      });

      it('MUST return list of waterholes for world', async () => {
        expect(await mediator.waterholeService.getWaterholesList(world.id)).toEqual([waterhole]);
      });
    });

    describe('WHEN "getWaterhole" is called', () => {
      beforeEach(() => {
        (mockedWaterholeRepository.get as jest.Mock).mockResolvedValue(waterhole);
      });

      it('MUST call "WaterholeRepository.get"', async () => {
        await mediator.waterholeService.getWaterhole(waterhole.id);

        expect(mockedWaterholeRepository.get).toHaveBeenCalledWith(waterhole.id);
      });

      it('MUST return data of waterhole', async () => {
        expect(await mediator.waterholeService.getWaterhole(world.id)).toEqual(waterhole);
      });
    });

    describe('WHEN "createWaterhole" is called', () => {
      beforeEach(() => {
        (mockedWaterholeRepository.generateModel as jest.Mock).mockReturnValue(waterhole);
        (mockedWaterholeRepository.generateModelId as jest.Mock).mockReturnValue(true);
        (mockedWaterholeRepository.add as jest.Mock).mockResolvedValue(waterhole.id);
      });

      it('MUST call "WaterholeRepository.generateModel"', async () => {
        await mediator.waterholeService.createWaterhole(MOCKED_WATERHOLE);

        expect(mockedWaterholeRepository.generateModel).toHaveBeenCalledWith(MOCKED_WATERHOLE);
      });

      it('MUST call "WaterholeRepository.generateModelId"', async () => {
        await mediator.waterholeService.createWaterhole(MOCKED_WATERHOLE);

        expect(mockedWaterholeRepository.generateModelId).toHaveBeenCalledWith(waterhole);
      });

      it('MUST call "WaterholeRepository.add"', async () => {
        await mediator.waterholeService.createWaterhole(MOCKED_WATERHOLE);

        expect(mockedWaterholeRepository.add).toHaveBeenCalledWith(waterhole);
      });

      it('MUST return id of waterhole', async () => {
        expect(await mediator.waterholeService.createWaterhole(MOCKED_WATERHOLE)).toEqual(waterhole.id);
      });
    });

    describe('WHEN "updateWaterhole" is called', () => {
      beforeEach(() => {
        (mockedWaterholeRepository.generateModel as jest.Mock).mockReturnValue(waterhole);
        (mockedWaterholeRepository.generateModelId as jest.Mock).mockReturnValue(true);
        (mockedWaterholeRepository.replace as jest.Mock).mockResolvedValue(true);
      });

      it('MUST call "WaterholeRepository.generateModel"', async () => {
        await mediator.waterholeService.updateWaterhole(MOCKED_WATERHOLE);

        expect(mockedWaterholeRepository.generateModel).toHaveBeenCalledWith(MOCKED_WATERHOLE);
      });

      it('MUST call NOT "WaterholeRepository.generateModelId"', async () => {
        await mediator.waterholeService.updateWaterhole(MOCKED_WATERHOLE_2);
        const waterhole = new WaterholeModel(MOCKED_WATERHOLE_2);

        expect(mockedWaterholeRepository.generateModelId).not.toHaveBeenCalledWith(waterhole);
      });

      it('MUST call "WaterholeRepository.replace"', async () => {
        await mediator.waterholeService.updateWaterhole(MOCKED_WATERHOLE);

        expect(mockedWaterholeRepository.replace).toHaveBeenCalledWith(waterhole);
      });

      it('MUST return boolean value for operation', async () => {
        expect(await mediator.waterholeService.updateWaterhole(MOCKED_WATERHOLE)).toEqual(true);
      });
    });

    describe('WHEN "removeWaterhole" is called', () => {
      beforeEach(() => {
        (mockedWaterholeRepository.get as jest.Mock).mockResolvedValue(waterhole);
        (mockedWaterholeRepository.list as jest.Mock).mockResolvedValue([waterhole, waterhole, waterhole]);
        (mockedWaterholeRepository.remove as jest.Mock).mockResolvedValue(true);
      });

      it('MUST call "WaterholeRepository.get"', async () => {
        await mediator.waterholeService.removeWaterhole(waterhole.id);

        expect(mockedWaterholeRepository.get).toHaveBeenCalledWith(waterhole.id);
      });

      it('AND waterhole does not exist, MUST throw error', async () => {
        (mockedWaterholeRepository.get as jest.Mock).mockResolvedValue(null);

        try {
          await mediator.waterholeService.removeWaterhole(waterhole.id);
        } catch (e) {
          expect(e).toEqual(mediator.waterholeService.errorLog.formatWrongFieldsError({ waterholeId: waterhole.id }));
        }
      });

      it('MUST call "WaterholeRepository.list"', async () => {
        await mediator.waterholeService.removeWaterhole(waterhole.id);

        expect(mockedWaterholeRepository.list).toHaveBeenCalledWith(world.id);
      });

      it('AND quantity of waterholes more then threshold, MUST call "WaterholeRepository.remove"', async () => {
        await mediator.waterholeService.removeWaterhole(waterhole.id);

        expect(mockedWaterholeRepository.remove).toHaveBeenCalledWith(waterhole.id);
      });

      it('AND quantity of waterholes less or equal threshold, MUST NOT call "WaterholeRepository.remove"', async () => {
        (mockedWaterholeRepository.list as jest.Mock).mockResolvedValue([]);

        try {
          await mediator.waterholeService.removeWaterhole(waterhole.id);
        } catch (e) {
          expect(e).toEqual(mediator.waterholeService.errorLog.formatWrongFieldsError({ waterholesInList: 'less_then_2' }));
        }
      });
    });
  });
});
