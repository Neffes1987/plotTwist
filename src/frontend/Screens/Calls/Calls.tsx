import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';
import { useNavigation } from '@react-navigation/native';

import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { callsListTranslations } from '../../App/initI18n/schemas/callsTranslationSchema';
import { callsStore } from '../../Stores/Calls.store';
import { ConfirmDrawer } from '../../UI/ConfirmDrower';
import { CallsWidget } from '../../Widgets/EntityListWidget/CallsWidget';
import { ROUTES } from '../routes';

export const Calls = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { goBack, navigate } = useNavigation<Navigation>();
    const { updateContextErrors } = useErrorContext();
    const [selectedItem, setSelectedItem] = useState<string>();

    useEffect(() => {
      callsStore.list().catch(updateContextErrors);
    }, []);

    function onDeleteHandler(): void {
      callsStore.delete(selectedItem);

      onCloseDeleteConfirmHandler();
    }

    function onShowDeleteConfirmHandler(callId: string): void {
      setSelectedItem(callId);
    }

    function onCloseDeleteConfirmHandler(): void {
      setSelectedItem('');
    }

    function onCreateHandler(): void {
      navigate(ROUTES.activeCall);
    }

    function onOpenHandler(id: string): void {
      navigate(ROUTES.activeCall, { state: { id } });
    }

    return (
      <>
        <CommonListView
          title={t(callsListTranslations.caption)}
          onBackClick={goBack}
          list={callsStore.calls.map(item => (
            <CallsWidget data={item} onDelete={onShowDeleteConfirmHandler} onSelect={onOpenHandler} key={item.id} />
          ))}
          onCreate={onCreateHandler}
        />

        <ConfirmDrawer onConfirm={onDeleteHandler} onClose={onCloseDeleteConfirmHandler} isOpen={!!selectedItem} />
      </>
    );
  },
);
