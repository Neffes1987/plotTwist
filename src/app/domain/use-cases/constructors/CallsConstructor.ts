import { ICallConstructor } from '../../../../types/constructors/call.constructor';
import { CallDTO } from '../../../../types/entities/call';
import { Call } from '../../entities/Call/Call';

export class CallsConstructor implements ICallConstructor {
  async delete(id: string): Promise<boolean> {
    const call = new Call();

    call.id = id;

    return call.remove();
  }

  async get(id: string): Promise<Nullable<CallDTO>> {
    const call = new Call();

    call.id = id;

    await call.load();

    return call.serialize();
  }

  list(params: ListParams<CallDTO>): Promise<CallDTO[]> {
    const call = new Call();

    return call.list(params);
  }

  async save(dto: CallDTO): Promise<string> {
    const call = new Call();

    call.unSerialize(dto);

    call.id = await call.save();

    return call.id;
  }
}
