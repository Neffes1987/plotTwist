import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';

import { useErrorContext } from '../../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { charactersTranslations } from '../../../App/initI18n/schemas/characterTranslation';
import { useAppNavigation } from '../../../Hooks/useAppNavigation';
import { useDeleteConfirm } from '../../../Hooks/useDeleteConfirm';
import { useSelectItems } from '../../../Hooks/useSelectItems';
import { charactersStore } from '../../../Stores/Characters.store';
import { ConfirmDrawer } from '../../../UI/ConfirmDrower';
import { CharacterWidget } from '../../../Widgets/EntityListWidget/CharacterWidget';
import { ROUTES } from '../../routes';

export const CharactersList = observer(
  (): ReactElement => {
    const { goBack, navigate, state } = useAppNavigation();
    const { t } = useTranslation();
    const { updateContextErrors } = useErrorContext();
    const { deletedItemId, setDeletedItemId, clearDeleteItemId } = useDeleteConfirm();
    const { sendBack, toggleItem, selectedItems } = useSelectItems('character');
    const characterType = state?.characterType;
    const selectable = state?.selectable;

    useEffect(() => {
      charactersStore
        .list(
          characterType
            ? {
                query: {
                  type: characterType,
                },
              }
            : undefined,
        )
        .catch(updateContextErrors);
    }, [characterType]);

    function onCreateHandler(): void {
      navigate(ROUTES.charactersConstructor, { state: { characterType } });
    }

    function onEditHandler(id: string): void {
      navigate(ROUTES.charactersConstructor, { state: { id, characterType } });
    }

    function onDeleteHandler(): void {
      charactersStore.delete(deletedItemId);
      clearDeleteItemId();
    }

    return (
      <>
        <CommonListView
          title={t(charactersTranslations.caption)}
          onBackClick={goBack}
          onSelect={selectable ? sendBack : undefined}
          list={charactersStore.characters.map(character => (
            <CharacterWidget
              isSelect={selectedItems.includes(character.id)}
              onEdit={onEditHandler}
              onDelete={setDeletedItemId}
              onSelect={selectable ? toggleItem : undefined}
              data={character}
              key={character.id}
            />
          ))}
          onCreate={onCreateHandler}
        />

        <ConfirmDrawer onConfirm={onDeleteHandler} onClose={clearDeleteItemId} isOpen={!!deletedItemId} />
      </>
    );
  },
);
