import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';

import { PlotDTO } from '../../../types/entities/plot';
import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import { useTogglePopover } from '../../App/hooks/useTogglePopover';
import { DEFAULT_FORM_VALUES, plotListTranslations } from '../../App/initI18n/schemas/plotListTranslations';
import notifier from '../../App/notify/notify';
import activePlotStore from '../../Stores/ActivePlot.store';
import { plotsStore } from '../../Stores/Plots.store';
import { UIInput } from '../../UI/UIInput/UIInput';
import { UIList } from '../../UI/UIList/UIList';
import { CreateEntityWidget } from '../../Widgets/CreateEntityWidget/CreateEntityWidget';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { ROUTES } from '../routes';
import { NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../Tasks/constants';

export const PlotList = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { updateContextErrors } = useErrorContext();
    const { navigate } = useNavigation<Navigation>();
    const { isEditDrawerOpen, onOpenPopoverHandler, onClosePopoverHandler } = useTogglePopover();
    const { form, setFormFieldData, formErrors, resetForm } = useForm<Omit<PlotDTO, 'worlds'>>(DEFAULT_FORM_VALUES, DEFAULT_FORM_VALUES);

    useEffect(() => {
      plotsStore.list().catch(updateContextErrors);
    }, []);

    async function updatePlot(): Promise<void> {
      try {
        await plotsStore.updatePlot(form);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function deletePlot(): Promise<void> {
      try {
        await plotsStore.deletePlot(form.id);
      } catch (e) {
        updateContextErrors?.(e);
      }

      resetForm();
      onClosePopoverHandler();
    }

    async function createPlot(): Promise<void> {
      const { name } = form;

      try {
        const plotId = await plotsStore.createPlot(name);

        if (plotId) {
          onClosePopoverHandler();
          resetForm();
          notifier.showMessage(t('messages.success'), t(plotListTranslations.messages.wasCreated), false);
        }
      } catch (e) {
        updateContextErrors?.(e);
      }
    }

    function onEditPlot(plotId: string): void {
      const plot = plotsStore.plots.find(({ id }) => id === plotId);

      if (!plot) {
        return;
      }

      resetForm({
        id: plot.id,
        name: plot.name,
        status: form.status,
      });

      onOpenPopoverHandler();
    }

    function onNavigateToPlotHandler(plotId: string): void {
      activePlotStore.selectedPlotId = plotId;
      navigate(ROUTES.activePlot);
    }

    return (
      <ScreenView
        header={{
          title: t(plotListTranslations.caption),
          onBackClick: () => navigate(ROUTES.home),
        }}
      >
        <UIList
          list={plotsStore.plots}
          emptyListCaption={plotListTranslations.messages.emptyList}
          onEdit={onEditPlot}
          onOpen={onNavigateToPlotHandler}
          onCreate={onOpenPopoverHandler}
        />

        <CreateEntityWidget
          onApply={!form.id ? createPlot : updatePlot}
          onDelete={form.id ? deletePlot : undefined}
          caption={t(!form.id ? plotListTranslations.actions.addNew : plotListTranslations.actions.update)}
          isOpen={isEditDrawerOpen}
          onClose={onClosePopoverHandler}
        >
          <UIInput
            maxValueLength={SHORT_VALUE_MAX_LENGTH}
            error={formErrors.name}
            name="name"
            value={form.name}
            onChange={setFormFieldData}
            label={t(plotListTranslations.labels.name)}
            minValueLength={NAME_VALUE_MIN_LENGTH}
          />
        </CreateEntityWidget>
      </ScreenView>
    );
  },
);
