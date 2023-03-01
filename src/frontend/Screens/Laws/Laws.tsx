import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CommonListView } from 'src/frontend/Widgets/CommonListView/CommonListView';
import { useNavigation } from '@react-navigation/native';

import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import { useTogglePopover } from '../../App/hooks/useTogglePopover';
import { DEFAULT_FORM_VALUES, lawListTranslations } from '../../App/initI18n/schemas/lawsTranslationSchema';
import notifier from '../../App/notify/notify';
import { lawsStore } from '../../Stores/Laws.store';
import { UIInput } from '../../UI/UIInput/UIInput';
import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../Tasks/constants';

export const Laws = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { goBack } = useNavigation();
    const { updateContextErrors } = useErrorContext();
    const { isEditDrawerOpen, onOpenPopoverHandler, onClosePopoverHandler } = useTogglePopover();
    const { form, setFormFieldData, formErrors, resetForm } = useForm<LawInWorldDTO>(DEFAULT_FORM_VALUES, DEFAULT_FORM_VALUES);

    useEffect(() => {
      lawsStore.list().catch(updateContextErrors);
    }, []);

    async function onUpdateHandler(): Promise<void> {
      try {
        await lawsStore.update(form);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function onDeleteHandler(): Promise<void> {
      try {
        await lawsStore.delete(form.id);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function onCreateHandler(): Promise<void> {
      try {
        const lawId = await lawsStore.create(form);

        if (lawId) {
          onClosePopoverHandler();
          resetForm();
          notifier.showMessage(t('messages.success'), t(lawListTranslations.messages.wasCreated), false);
        }
      } catch (e) {
        updateContextErrors?.(e);
      }
    }

    function onEditHandler(lawId: string): void {
      const law = lawsStore.laws.find(({ id }) => id === lawId);

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

    return (
      <CommonListView
        title={t(lawListTranslations.caption)}
        onBackClick={goBack}
        list={lawsStore.laws}
        onEditHandler={onEditHandler}
        onOpen={onEditHandler}
        onCreate={onOpenPopoverHandler}
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
      </CommonListView>
    );
  },
);
