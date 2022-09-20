import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LawDTO } from 'backend';
import { observer } from 'mobx-react';

import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../constants';
import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import { useTogglePopover } from '../../App/hooks/useTogglePopover';
import notifier from '../../App/notify/notify';
import { UIInput } from '../../UI/UIInput/UIInput';
import { UIList } from '../../UI/UIList/UIList';
import { CreateEntityWidget } from '../../Widgets/CreateEntityWidget/CreateEntityWidget';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';

import { DEFAULT_FORM_VALUES, lawListTranslations } from './constants';
import { lawsListStore } from './LawsListStore';

export const Laws = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { updateContextErrors } = useErrorContext();
    const { isEditDrawerOpen, onOpenPopoverHandler, onClosePopoverHandler } = useTogglePopover();
    const { form, setFormFieldData, formErrors, resetForm } = useForm<LawDTO>(DEFAULT_FORM_VALUES, DEFAULT_FORM_VALUES);

    useEffect(() => {
      lawsListStore.list().catch(updateContextErrors);
    }, []);

    async function onUpdateHandler(): Promise<void> {
      try {
        await lawsListStore.update(form);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function onDeleteHandler(): Promise<void> {
      try {
        await lawsListStore.delete(form.id);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function onCreateHandler(): Promise<void> {
      const { name, description, punishment } = form;

      try {
        const plotId = await lawsListStore.create(name, description, punishment);

        if (plotId) {
          onClosePopoverHandler();
          resetForm();
          notifier.showMessage(t('messages.success'), t(lawListTranslations.messages.wasCreated), false);
        }
      } catch (e) {
        updateContextErrors?.(e);
      }
    }

    function onEditHandler(lawId: string): void {
      const law = lawsListStore.laws.find(({ id }) => id === lawId);

      if (!law) {
        return;
      }

      resetForm({
        description: law.description ?? '',
        id: law.id,
        name: law.name,
        punishment: law.punishment,
        isBroken: form.isBroken,
      });

      onOpenPopoverHandler();
    }

    async function onAddToWorldHandler(): Promise<void> {}

    return (
      <ScreenView
        header={{
          title: t(lawListTranslations.caption),
        }}
      >
        <UIList list={lawsListStore.laws} onEdit={onEditHandler} onOpen={onAddToWorldHandler} onCreate={onOpenPopoverHandler} />

        <CreateEntityWidget
          onApply={!form.id ? onCreateHandler : onUpdateHandler}
          onDelete={form.id ? onDeleteHandler : undefined}
          caption={t(!form.id ? lawListTranslations.actions.addNew : lawListTranslations.actions.update)}
          isOpen={isEditDrawerOpen}
          onClose={onClosePopoverHandler}
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
            error={formErrors.punishment}
            multiline
            minValueLength={SHORT_VALUE_MAX_LENGTH}
            maxValueLength={MIDDLE_VALUE_MAX_LENGTH}
            name="punishment"
            value={form.punishment}
            onChange={setFormFieldData}
            label={t(lawListTranslations.labels.punishment)}
          />

          <UIInput
            error={formErrors.description}
            multiline
            maxValueLength={BIG_VALUE_MAX_LENGTH}
            name="description"
            value={form.description}
            onChange={setFormFieldData}
            label={t(lawListTranslations.labels.description)}
          />
        </CreateEntityWidget>
      </ScreenView>
    );
  },
);
