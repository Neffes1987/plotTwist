export interface UIListProps {
  list: SelectOption[];
  emptyListCaption?: string;
  onEdit?: (itemId: string) => void;
  onOpen: (itemId: string) => void;
  onCreate: () => void;
}
