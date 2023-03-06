import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';

import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useAppNavigation } from '../../Hooks/useAppNavigation';
import { useDeleteConfirm } from '../../Hooks/useDeleteConfirm';
import { useSelectItems } from '../../Hooks/useSelectItems';
import { ConfirmDrawer } from '../../UI/ConfirmDrower';
import { ROUTES } from '../routes';

import { taskStore } from './stores/TaskStore';
import { TaskWidget } from './TaskWidget';
import { taskTranslations } from './translation/taskTranslations';

export const TaskList = observer(
  (): ReactElement => {
    const { navigate, state, goBackSameState } = useAppNavigation();
    const { t } = useTranslation();
    const { updateContextErrors } = useErrorContext();
    const isSelectable = state?.selectable;
    const selectedItem = state?.selectedItems;
    const isSingle = state?.selectedItems?.single;
    const edgeType = state?.edgeType;
    const { deletedItemId, setDeletedItemId, clearDeleteItemId } = useDeleteConfirm();

    const { selectedItems, toggleItem, sendBack } = useSelectItems(state?.selectedItems?.type ?? 'task', selectedItem?.ids, isSingle);

    useEffect(() => {
      taskStore.edgeType = edgeType;
      taskStore.list().catch(updateContextErrors);
    }, [edgeType]);

    function onCreateHandler(): void {
      navigate(ROUTES.taskConstructor, { state: { edgeType, selectable: isSelectable } });
    }

    function onOpenHandler(id: string): void {
      navigate(ROUTES.taskConstructor, { state: { id, edgeType, selectable: isSelectable } });
    }

    function onDeleteHandler(): void {
      if (!deletedItemId) {
        return;
      }

      taskStore.delete(deletedItemId);
      clearDeleteItemId();
    }

    return (
      <>
        <CommonListView
          onSelect={isSelectable ? sendBack : undefined}
          title={`${t(taskTranslations.labels.listCaption)} (${edgeType})`}
          onBackClick={goBackSameState}
          list={taskStore.tasks.map(task => (
            <TaskWidget
              onEdit={onOpenHandler}
              key={task.id}
              onSelect={toggleItem}
              isSelect={selectedItems.includes(task.id)}
              onDelete={setDeletedItemId}
              data={task}
            />
          ))}
          onCreate={onCreateHandler}
        />

        <ConfirmDrawer onConfirm={onDeleteHandler} onClose={clearDeleteItemId} isOpen={!!deletedItemId} />
      </>
    );
  },
);
