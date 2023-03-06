export class ButchSavingConstructor<T extends CommonEntityDTO> {
  modelDTO: T;
  existedDTOs: T[];
  addedIds: string[];
  crossIdFieldName: keyof T;

  constructor(modelDTO: T, existedDTOs: T[], addedIds: string[], crossIdFieldName: keyof T) {
    this.modelDTO = modelDTO;
    this.existedDTOs = existedDTOs;
    this.addedIds = addedIds;
    this.crossIdFieldName = crossIdFieldName;
  }

  execute(): {
    removedIds: string[];
    addedDTOs: T[];
  } {
    const addedDTOs: T[] = [];
    const removedIds: string[] = [];
    const existedIds: string[] = [];

    this.existedDTOs.map(item => {
      const crossId = (item[this.crossIdFieldName] as unknown) as string;

      if (!this.addedIds.includes(crossId)) {
        removedIds.push(item.id);
      } else {
        existedIds.push(crossId);
      }
    });

    this.addedIds.forEach(addedItemId => {
      if (!existedIds.includes(addedItemId)) {
        addedDTOs.push({
          ...this.modelDTO,
          [this.crossIdFieldName]: addedItemId,
        });
      }
    });

    return {
      removedIds,
      addedDTOs,
    };
  }
}
