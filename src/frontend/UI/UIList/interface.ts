export interface UIListProps {
  selected?: string | number;
  list: SelectOption[] | JSX.Element[];
  emptyListCaption?: string;
  onEdit?: (itemId: string) => void;
  onOpen?: (itemId: string) => void;
  onCreate?: () => void;
}
