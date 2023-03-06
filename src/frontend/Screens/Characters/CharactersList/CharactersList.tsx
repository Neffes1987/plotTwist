import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';

import { useErrorContext } from '../../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useAppNavigation } from '../../../Hooks/useAppNavigation';
import { useDeleteConfirm } from '../../../Hooks/useDeleteConfirm';
import { useSelectItems } from '../../../Hooks/useSelectItems';
import { ConfirmDrawer } from '../../../UI/ConfirmDrower';
import { ROUTES } from '../../routes';
import { CharacterWidget } from '../CharacterWidget';
import { charactersStore } from '../stores/Characters.store';
import { charactersTranslations } from '../translation/characterTranslation';

export const CharactersList = observer(
  (): ReactElement => {
    const { goBack, navigate, state } = useAppNavigation();
    const { t } = useTranslation();
    const { updateContextErrors } = useErrorContext();
    const { deletedItemId, setDeletedItemId, clearDeleteItemId } = useDeleteConfirm();
    const characterType = state?.characterType;
    const selectedItemIds = state?.selectedItems?.ids;

    const { sendBack, toggleItem, selectedItems } = useSelectItems('character', selectedItemIds);

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
      navigate(ROUTES.charactersConstructor, { state: { characterType, selectable } });
    }

    function onEditHandler(id: string): void {
      navigate(ROUTES.charactersConstructor, { state: { id, characterType, selectable } });
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
