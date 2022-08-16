import { AbstractWorld } from '../../entities/World/AbstractWorld/AbstractWorld';
import { WorldStatus, WorldType } from '../../entities/World/AbstractWorld/interface';
import { HiddenCaveWorld } from '../../entities/World/HiddenCaveWorld/HiddenCaveWorld';
import { HolidayWorld } from '../../entities/World/HolydayWorld/HolydayWorld';
import { ChaseType, HolidaySubType, HolidayType } from '../../entities/World/HolydayWorld/interface';
import { PlainWorld } from '../../entities/World/PlainWorld/PlainWorld';
import { PrivateWorld } from '../../entities/World/PrivateWorld/PrivateWorld';
import { FinalType, PotionType } from '../../entities/World/ReturnWithPotionWorld/interface';
import { ReturnWithPotionWorld } from '../../entities/World/ReturnWithPotionWorld/ReturnWithPotionWorld';
import { AbstractRepository } from '../AbstractRepository/AbstractRepository';
import { IDataProvider, RawDataType } from '../AbstractRepository/interface';

export class WorldRepository extends AbstractRepository {
  constructor(dataProvider: IDataProvider) {
    super(dataProvider);
  }

  protected serializeEntity(entity: AbstractWorld): RawDataType {
    return (entity.serialize() as unknown) as RawDataType;
  }

  protected unSerializeToEntity(object: RawDataType): AbstractWorld {
    let world: AbstractWorld;
    const worldType = object.type as WorldType;

    switch (worldType) {
      case 'plainWorld':
        world = this.fillPlainWorld(object);

        break;
      case 'privateWorld':
        world = this.fillPrivateWorld(object);

        break;
      case 'hiddenCave':
        world = this.fillHiddenCaveWorld(object);

        break;
      case 'holiday':
        world = this.fillHolidayWorld(object);

        break;
      case 'returnWithPotion':
        world = this.fillReturnToPotionWorld(object);

        break;
      default:
        throw new Error('WRONG_WORLD_TYPE');
    }

    return this.fillCommonWorld(object, world);
  }

  private fillPlainWorld(object: RawDataType): AbstractWorld {
    const world = new PlainWorld();

    world.setIntroduction((object.introduction as string) ?? '');

    return world;
  }

  private fillPrivateWorld(object: RawDataType): AbstractWorld {
    const world = new PrivateWorld();

    world.setContrast((object.contrast as string) ?? '');

    return world;
  }

  private fillHiddenCaveWorld(object: RawDataType): AbstractWorld {
    const world = new HiddenCaveWorld();

    world.setMainEdgeInformation((object.mainEdgeInformation as string) ?? '');
    world.setShadowIntroduction((object.shadowIntroduction as string) ?? '');
    world.setPartyPlan((object.partyPlan as string) ?? '');

    return world;
  }

  private fillHolidayWorld(object: RawDataType): AbstractWorld {
    const world = new HolidayWorld();

    world.setShadowRevenge((object.shadowRevenge as string) ?? '');
    world.setHolidayType((object.holidayType as HolidayType) ?? '');
    world.setHolidaySubType((object.holidaySubType as HolidaySubType) ?? null);
    world.setChase((object.chase as ChaseType) ?? null);

    return world;
  }

  private fillReturnToPotionWorld(object: RawDataType): AbstractWorld {
    const world = new ReturnWithPotionWorld();

    world.setFinalType((object.finalType as FinalType) ?? null);
    world.setCliffhanger((object.cliffhanger as string) ?? undefined);
    world.setPotionType((object.potionType as PotionType) ?? undefined);

    return world;
  }

  private fillCommonWorld(object: RawDataType, world: AbstractWorld): AbstractWorld {
    world.setId((object.id as string) ?? '');
    world.setName((object.name as string) ?? '');
    world.setDescription((object.description as string) ?? '');
    world.setStatus(object.status as WorldStatus);
    world.setStory((object.story as string) ?? '');
    world.setReference((object.reference as string) ?? '');
    world.setTimeline((object.timeline as string) ?? '');
    world.setPlotId((object.plotId as string) ?? '');
    world.setFailPrice((object.failPrice as string) ?? '');

    return world;
  }
}
