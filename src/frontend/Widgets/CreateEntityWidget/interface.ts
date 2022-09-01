import { PropsWithChildren } from 'react';

import { DrawerProps } from '../../UI/interface';

export interface CreateEntityWidgetProps extends PropsWithChildren<DrawerProps> {
  onApply: () => void;
  onDelete?: () => void;
}
