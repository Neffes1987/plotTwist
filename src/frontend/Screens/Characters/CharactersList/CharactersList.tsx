import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';
import { useNavigation } from '@react-navigation/native';

import { useErrorContext } from '../../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { charactersTranslations } from '../../../App/initI18n/schemas/characterTranslation';
import { charactersStore } from '../../../Stores/Characters.store';
import { ConfirmDrawer } from '../../../UI/ConfirmDrower';
import { CharacterWidget } from '../../../Widgets/EntityListWidget/CharacterWidget';
import { ROUTES } from '../../routes';

export const CharactersList = observer(
  (): ReactElement => {
    const { goBack, navigate } = useNavigation<Navigation>();
    const { t } = useTranslation();
    const { updateContextErrors } = useErrorContext();
    const [selectedItem, setSelectedItem] = useState<string>();

    useEffect(() => {
      charactersStore.list().catch(updateContextErrors);
    }, []);

    function onCreateHandler(): void {
      navigate(ROUTES.charactersConstructor);
    }

    function onEditHandler(id: string): void {
      navigate(ROUTES.charactersConstructor, { state: { id } });
    }

    function onDeleteHandler(): void {
      charactersStore.delete(selectedItem);
      onCloseDeleteConfirmHandler();
    }

    function onCloseDeleteConfirmHandler(): void {
      setSelectedItem('');
    }

    return (
      <>
        <CommonListView
          title={t(charactersTranslations.caption)}
          onBackClick={goBack}
          list={charactersStore.characters.map(character => (
            <CharacterWidget onDelete={setSelectedItem} onSelect={onEditHandler} data={character} key={character.id} />
          ))}
          onCreate={onCreateHandler}
        />

        <ConfirmDrawer onConfirm={onDeleteHandler} onClose={onCloseDeleteConfirmHandler} isOpen={!!selectedItem} />
      </>
    );
  },
);
