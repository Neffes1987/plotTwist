export interface ConfirmDrawerProps {
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
