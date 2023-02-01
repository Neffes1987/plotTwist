import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import { useTogglePopover } from '../../App/hooks/useTogglePopover';
import notifier from '../../App/notify/notify';
import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../constants';
import { useSelectedIdWorldId } from '../../Hooks/useSelectedIdWorldId';
import { edgeStore } from '../../Stores/Edge.store';
import { rewardsStore } from '../../Stores/Rewards.store';
import { UIInput } from '../../UI/UIInput/UIInput';
import { RouteParams } from '../interface';

import { DEFAULT_FORM_VALUES, lawListTranslations } from './constants';

export const Rewards = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { goBack } = useNavigation();
    const { updateContextErrors } = useErrorContext();
    const { isEditDrawerOpen, onOpenPopoverHandler, onClosePopoverHandler } = useTogglePopover();
    const { form, setFormFieldData, formErrors, resetForm } = useForm<RewardInEdgeDTO>(DEFAULT_FORM_VALUES, DEFAULT_FORM_VALUES);
    const selectedWorld = useSelectedIdWorldId();
    const { params } = useRoute<RouteParams>();
    const edgeId = params.state.id;

    useEffect(() => {
      if (edgeId) {
        rewardsStore.list().catch(updateContextErrors);
        edgeStore.getSelectedRewardsByEdgeId(edgeId).catch(updateContextErrors);
      }
    }, [edgeId]);

    async function onUpdateHandler(): Promise<void> {
      try {
        await rewardsStore.update(form);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function onDeleteHandler(): Promise<void> {
      try {
        await rewardsStore.delete(form.id);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function onCreateHandler(): Promise<void> {
      try {
        const rewardId = await rewardsStore.create(form);

        if (rewardId) {
          onClosePopoverHandler();
          resetForm();
          notifier.showMessage(t('messages.success'), t(lawListTranslations.messages.wasCreated), false);
        }
      } catch (e) {
        updateContextErrors?.(e);
      }
    }

    function onEditHandler(lawId: string): void {
      const rewardInEdgeDTO = rewardsStore.rewards.find(({ id }) => id === lawId);

      if (!rewardInEdgeDTO) {
        return;
      }

      resetForm({
        description: rewardInEdgeDTO.description ?? '',
        id: rewardInEdgeDTO.id,
        name: rewardInEdgeDTO.name,
        isAssigned: rewardInEdgeDTO.isAssigned,
      });

      onOpenPopoverHandler();
    }

    async function onAddToEdgeHandler(itemId: string): Promise<void> {
      if (!selectedWorld) {
        return;
      }

      const reward = rewardsStore.rewards.find(({ id }) => id === itemId);

      if (!reward?.id) {
        return;
      }

      await edgeStore.toggleRewardInEdge(edgeId ?? '', reward.id);
    }

    const selectedIds = edgeStore.selectedRewards;

    return (
      <CommonListView
        title={t(lawListTranslations.caption)}
        onBackClick={goBack}
        list={rewardsStore.rewards.map(reward => ({ ...reward, isSelected: selectedIds.includes(reward.id) }))}
        onEditHandler={onEditHandler}
        onAddToWorldHandler={onAddToEdgeHandler}
        onOpenPopoverHandler={onOpenPopoverHandler}
        onApply={!form.id ? onCreateHandler : onUpdateHandler}
        onDelete={form.id ? onDeleteHandler : undefined}
        popupTitle={t(!form.id ? lawListTranslations.actions.addNew : lawListTranslations.actions.update)}
        isEditDrawerOpen={isEditDrawerOpen}
        onClosePopup={onClosePopoverHandler}
      >
        <UIInput
          maxValueLength={SHORT_VALUE_MAX_LENGTH}
          error={formErrors.name}
          name="name"
          value={form.name}
          onChange={setFormFieldData}
          label={t(lawListTranslations.labels.name)}
          minValueLength={NAME_VALUE_MIN_LENGTH}
        />

        <UIInput
          error={formErrors.description}
          multiline
          minValueLength={SHORT_VALUE_MAX_LENGTH}
          maxValueLength={MIDDLE_VALUE_MAX_LENGTH}
          name="description"
          value={form.description}
          onChange={setFormFieldData}
          label={t(lawListTranslations.labels.description)}
        />
      </CommonListView>
    );
  },
);
