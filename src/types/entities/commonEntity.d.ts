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
