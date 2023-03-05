import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';

import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { taskTranslations } from '../../App/initI18n/schemas/taskTranslations';
import { useAppNavigation } from '../../Hooks/useAppNavigation';
import { taskStore } from '../../Stores/TaskStore';
import { ConfirmDrawer } from '../../UI/ConfirmDrower';
import { TaskWidget } from '../../Widgets/EntityListWidget/TaskWidget';
import { ROUTES } from '../routes';

export const TaskList = observer(
  (): ReactElement => {
    const { goBack, navigate } = useAppNavigation();
    const { t } = useTranslation();
    const { updateContextErrors } = useErrorContext();
    const [selectedItem, setSelectedItem] = useState<string>();

    useEffect(() => {
      taskStore.list().catch(updateContextErrors);
    }, []);

    function onCreateHandler(): void {
      navigate(ROUTES.taskConstructor);
    }

    function onOpenHandler(id: string): void {
      navigate(ROUTES.taskConstructor, { state: { id } });
    }

    function onDeleteHandler(): void {
      if (!selectedItem) {
        return;
      }

      taskStore.delete(selectedItem);
      onCloseDeleteConfirmHandler();
    }

    function onShowDeleteConfirmHandler(callId: string): void {
      setSelectedItem(callId);
    }

    function onCloseDeleteConfirmHandler(): void {
      setSelectedItem('');
    }

    return (
      <>
        <CommonListView
          title={t(taskTranslations.labels.listCaption)}
          onBackClick={goBack}
          list={taskStore.tasks.map(task => (
            <TaskWidget key={task.id} onSelect={onOpenHandler} onDelete={onShowDeleteConfirmHandler} data={task} />
          ))}
          onCreate={onCreateHandler}
        />

        <ConfirmDrawer onConfirm={onDeleteHandler} onClose={onCloseDeleteConfirmHandler} isOpen={!!selectedItem} />
      </>
    );
  },
);
