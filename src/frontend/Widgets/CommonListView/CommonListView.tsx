import React, { PropsWithChildren, ReactElement } from 'react';

import { UIList } from '../../UI/UIList/UIList';
import { CreateEntityWidget } from '../CreateEntityWidget/CreateEntityWidget';
import { ScreenView } from '../ScreenView/ScreenView';

interface CommonListViewProps {
  isEditDrawerOpen?: boolean;
  onClosePopup?: () => void;
  popupTitle?: string;
  onDelete?: () => void;
  onApply?: () => void;
  title: string;
  onBackClick?: () => void;
  list: SelectOption[] | JSX.Element[];
  onEditHandler?: (itemId: string) => void;
  onOpen?: (itemId: string) => void;
  onCreate?: () => void;
  onSelect?: () => void;
}

export const CommonListView = (props: PropsWithChildren<CommonListViewProps>): ReactElement => {
  const {
    onSelect,
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
    onOpen,
    onCreate,
  } = props;

  return (
    <ScreenView
      header={{
        title,
        onBackClick,
        onRightIconClick: onSelect,
      }}
    >
      <UIList list={list} onEdit={onEditHandler} onOpen={onOpen} onCreate={onCreate} />

      {!!popupTitle && onApply && (
        <CreateEntityWidget onApply={onApply} onDelete={onDelete} caption={popupTitle} isOpen={isEditDrawerOpen} onClose={onClosePopup}>
          {children}
        </CreateEntityWidget>
      )}
    </ScreenView>
  );
};
