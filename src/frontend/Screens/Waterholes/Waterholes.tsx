import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import { useTogglePopover } from '../../App/hooks/useTogglePopover';
import notifier from '../../App/notify/notify';
import { useAppNavigation } from '../../Hooks/useAppNavigation';
import { useSelectItems } from '../../Hooks/useSelectItems';
import { UIInput } from '../../UI/UIInput/UIInput';
import { CommonListView } from '../../Widgets/CommonListView/CommonListView';
import { BIG_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../Tasks/constants';

import { waterholeList } from './stores/Waterholes.store';
import { DEFAULT_FORM_VALUES, waterholesListTranslations } from './translation/waterholesListTranslations';
import { WaterholeWidget } from './WaterholeWidget';

export const Waterholes = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { goBack, state } = useAppNavigation();
    const isSelectable = state?.selectable;
    const selectedItem = state?.selectedItems;
    const { selectedItems, toggleItem, sendBack } = useSelectItems('waterholes', selectedItem?.ids);

    const { updateContextErrors } = useErrorContext();
    const { isEditDrawerOpen, onOpenPopoverHandler, onClosePopoverHandler } = useTogglePopover();
    const { form, setFormFieldData, formErrors, resetForm } = useForm<WaterholeInWorldDTO>(DEFAULT_FORM_VALUES, DEFAULT_FORM_VALUES);

    useEffect(() => {
      waterholeList.list().catch(updateContextErrors);
    }, []);

    async function onUpdateHandler(): Promise<void> {
      try {
        await waterholeList.update(form);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function onDeleteHandler(): Promise<void> {
      try {
        await waterholeList.delete(form.id);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function onCreateHandler(): Promise<void> {
      try {
        const plotId = await waterholeList.create(form);

        if (plotId) {
          onClosePopoverHandler();
          resetForm();
          notifier.showMessage(t('messages.success'), t(waterholesListTranslations.messages.wasCreated), false);
        }
      } catch (e) {
        updateContextErrors?.(e);
      }
    }

    function onEditHandler(lawId: string): void {
      const waterhole = waterholeList.waterholes.find(({ id }) => id === lawId);

      if (!waterhole) {
        return;
      }

      resetForm({
        description: waterhole.description ?? '',
        id: waterhole.id,
        name: waterhole.name,
      });

      onOpenPopoverHandler();
    }

    return (
      <CommonListView
        onSelect={isSelectable ? sendBack : undefined}
        title={t(waterholesListTranslations.caption)}
        onBackClick={goBack}
        list={waterholeList.waterholes.map(data => (
          <WaterholeWidget
            key={data.id}
            onDelete={onDeleteHandler}
            data={data}
            onEdit={onEditHandler}
            onSelect={toggleItem}
            isSelect={selectedItems.includes(data.id)}
          />
        ))}
        onApply={!form.id ? onCreateHandler : onUpdateHandler}
        onCreate={onOpenPopoverHandler}
        popupTitle={t(!form.id ? waterholesListTranslations.actions.addNew : waterholesListTranslations.actions.update)}
        isEditDrawerOpen={isEditDrawerOpen}
        onClosePopup={onClosePopoverHandler}
      >
        <UIInput
          maxValueLength={SHORT_VALUE_MAX_LENGTH}
          error={formErrors.name}
          name="name"
          value={form.name}
          onChange={setFormFieldData}
          label={t(waterholesListTranslations.labels.name)}
          minValueLength={NAME_VALUE_MIN_LENGTH}
        />

        <UIInput
          error={formErrors.description}
          multiline
          maxValueLength={BIG_VALUE_MAX_LENGTH}
          name="description"
          value={form.description}
          onChange={setFormFieldData}
          label={t(waterholesListTranslations.labels.description)}
        />
      </CommonListView>
    );
  },
);
