import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';

import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import { useTogglePopover } from '../../App/hooks/useTogglePopover';
import notifier from '../../App/notify/notify';
import { useAppNavigation } from '../../Hooks/useAppNavigation';
import { useSelectItems } from '../../Hooks/useSelectItems';
import { UIInput } from '../../UI/UIInput/UIInput';
import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../Tasks/constants';

import { RewardWidget } from './RewardWidget';
import { rewardsStore } from './stores/Rewards.store';
import { DEFAULT_FORM_VALUES, rewardsListTranslations } from './translation/rewardsListTranslation';

export const Rewards = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { goBackSameState, state } = useAppNavigation();
    const { updateContextErrors } = useErrorContext();
    const isSelectable = state?.selectable;
    const selectedItem = state?.selectedItems;
    const { selectedItems, toggleItem, sendBack } = useSelectItems('reward', selectedItem?.ids);
    const { isEditDrawerOpen, onOpenPopoverHandler, onClosePopoverHandler } = useTogglePopover();
    const { form, setFormFieldData, formErrors, resetForm } = useForm<RewardInEdgeDTO>(DEFAULT_FORM_VALUES, DEFAULT_FORM_VALUES);

    useEffect(() => {
      rewardsStore.list().catch(updateContextErrors);
    }, []);

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
          notifier.showMessage(t('messages.success'), t(rewardsListTranslations.messages.wasCreated), false);
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
        isAchieved: rewardInEdgeDTO.isAchieved,
      });

      onOpenPopoverHandler();
    }

    return (
      <CommonListView
        onSelect={isSelectable ? sendBack : undefined}
        title={t(rewardsListTranslations.caption)}
        onBackClick={goBackSameState}
        list={rewardsStore.rewards.map(item => (
          <RewardWidget
            onDelete={onDeleteHandler}
            data={item}
            key={item.id}
            onEdit={onEditHandler}
            onSelect={toggleItem}
            isSelect={selectedItems.includes(item.id)}
          />
        ))}
        onCreate={onOpenPopoverHandler}
        onApply={!form.id ? onCreateHandler : onUpdateHandler}
        popupTitle={t(!form.id ? rewardsListTranslations.actions.addNew : rewardsListTranslations.actions.update)}
        isEditDrawerOpen={isEditDrawerOpen}
        onClosePopup={onClosePopoverHandler}
      >
        <UIInput
          maxValueLength={SHORT_VALUE_MAX_LENGTH}
          error={formErrors.name}
          name="name"
          value={form.name}
          onChange={setFormFieldData}
          label={t(rewardsListTranslations.labels.name)}
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
          label={t(rewardsListTranslations.labels.description)}
        />
      </CommonListView>
    );
  },
);
