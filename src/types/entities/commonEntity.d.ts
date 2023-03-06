interface CommonEntityDTO {
  id: string;
}

interface IActiveRecord {
  id: string;
  save: () => Promise<string>;
  load: () => Promise<void>;
  remove: () => Promise<boolean>;
  validate: () => void;
}

interface ICommonCrossConstructor<T extends CommonEntityDTO> {
  toggle: (addedIds: string[], parentId: string) => Promise<T[]>;
  assignedList: (parentId: string) => Promise<T[]>;
}
