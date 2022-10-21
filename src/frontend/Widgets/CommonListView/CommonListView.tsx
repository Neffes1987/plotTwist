import React, { PropsWithChildren, ReactElement } from 'react';

import { UIList } from '../../UI/UIList/UIList';
import { CreateEntityWidget } from '../CreateEntityWidget/CreateEntityWidget';
import { ScreenView } from '../ScreenView/ScreenView';

interface CommonListViewProps {
  isEditDrawerOpen: boolean;
  onClosePopup: () => void;
  popupTitle: string;
  onDelete?: () => void;
  onApply: () => void;
  title: string;
  onBackClick: () => void;
  list: SelectOption[];
  onEditHandler: (itemId: string) => void;
  onAddToWorldHandler: (itemId: string) => void;
  onOpenPopoverHandler: () => void;
}

export const CommonListView = (props: PropsWithChildren<CommonListViewProps>): ReactElement => {
  const {
    isEditDrawerOpen,
    children,
    onClosePopup,
    popupTitle,
    onDelete,
    onApply,
    title,
    onBackClick,
    list,
    onEditHandler,
    onAddToWorldHandler,
    onOpenPopoverHandler,
  } = props;

  return (
    <ScreenView
      header={{
        title,
        onBackClick,
      }}
    >
      <UIList list={list} onEdit={onEditHandler} onOpen={onAddToWorldHandler} onCreate={onOpenPopoverHandler} />

      <CreateEntityWidget onApply={onApply} onDelete={onDelete} caption={popupTitle} isOpen={isEditDrawerOpen} onClose={onClosePopup}>
        {children}
      </CreateEntityWidget>
    </ScreenView>
  );
};
