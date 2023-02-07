import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CharacterEnum } from '../../../constants/character.enum';
import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useSelectedIdWorldId } from '../../Hooks/useSelectedIdWorldId';
import { charactersStore } from '../../Stores/Characters.store';
import { worldsStore } from '../../Stores/Worlds.store';
import { worldWidgetNPCTranslations } from '../../Widgets/WorldWidget/worldWidgetTranslations';
import { RouteParams } from '../interface';
import { ROUTES } from '../routes';

import { DEFAULT_FORM_VALUES } from './constants';

export const Characters = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { params } = useRoute<RouteParams>();
    const { state } = params;
    const [charactersType] = state?.id?.split?.('_') ?? [];
    const defaults = DEFAULT_FORM_VALUES[charactersType as CharacterEnum];
    const store = charactersStore[defaults.type];

    const { goBack, navigate } = useNavigation<Navigation>();
    const { updateContextErrors } = useErrorContext();
    const selectedIds = worldsStore.getSelectedLawsIds();
    const selectedWorld = useSelectedIdWorldId();

    useEffect(() => {
      if (!charactersType) {
        navigate(ROUTES.home);
      }

      store.list().catch(updateContextErrors);
    }, []);

    async function onCreateHandler(): Promise<void> {}

    async function onEditHandler(): Promise<void> {}

    function onAddToWorldHandler(itemId: string): void {
      if (!selectedWorld) {
        return;
      }

      const character = store.characters.find(({ id }) => id === itemId);

      if (!character) {
        console.log(character);
      }

      // await worldsStore.toggleWorldLaw(law);
    }

    return (
      <CommonListView
        title={t(worldWidgetNPCTranslations.labels[charactersType])}
        onBackClick={goBack}
        list={store.characters.map(character => ({ ...character, isSelected: selectedIds.includes(character.id) }))}
        onAddToWorldHandler={onAddToWorldHandler}
        onOpenPopoverHandler={onCreateHandler}
        onEditHandler={onEditHandler}
      />
    );
  },
);
