export interface ListItemConstructorConfig<T extends CommonEntityDTO> {
  label: string;
  fieldName: keyof T;
  type: 'tag' | 'main' | 'additional';
}

export interface ListItemConstructorProps<T extends CommonEntityDTO> {
  data: T;
  captionFieldName: keyof T;
  config: ListItemConstructorConfig<T>[];
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isSelect?: boolean;
}

export interface ItemRowProps {
  title: string;
  margin?: number;
  value: string | number | boolean;
}
