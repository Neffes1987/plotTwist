import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlotDTO } from 'backend';
import { useNavigation } from '@react-navigation/native';

import { LawDTO } from '../../../app/domain/entities/interface';
import { BIG_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../constants';
import { useErrorContext } from '../../App/hooks/ErrorBoundaryContext/useErrorContext';
import { useForm } from '../../App/hooks/useForm';
import notifier from '../../App/notify/notify';
import store from '../../store/Store';
import { IconButton } from '../../UI/Buttons/IconButton';
import { Flex } from '../../UI/Flex/Flex';
import { ListItem } from '../../UI/ListItem/ListItem';
import { Typography } from '../../UI/Typography/Typography';
import { UIInput } from '../../UI/UIInput/UIInput';
import { CreateEntityWidget } from '../../Widgets/CreateEntityWidget/CreateEntityWidget';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { plotListTranslations } from '../PlotList/constants';
import { plotListStore } from '../PlotList/PlotListStore';
import { ROUTES } from '../routes';

import { DEFAULT_FORM_VALUES } from './constants';

export const List = (): ReactElement => {
  const { t } = useTranslation();
  const { updateContextErrors } = useErrorContext();
  const { navigate } = useNavigation<Navigation>();
  const [isEditPlotDrawerOpen, setIsEditPlotDrawerOpen] = useState(false);
  const { form, setFormFieldData, formErrors, resetForm } = useForm<Omit<LawDTO, 'id'>>(DEFAULT_FORM_VALUES, DEFAULT_FORM_VALUES);

  useEffect(() => {
    plotListStore.list().catch(updateContextErrors);
  }, []);

  async function updatePlot(): Promise<void> {
    try {
      await plotListStore.updatePlot(form);
    } catch (e) {
      updateContextErrors?.(e);
    }

    resetForm();
    closeCreateNewPlotPopover();
  }

  async function deletePlot(): Promise<void> {
    try {
      await plotListStore.deletePlot(form.id);
    } catch (e) {
      updateContextErrors?.(e);
    }

    resetForm();
    closeCreateNewPlotPopover();
  }

  async function createPlot(): Promise<void> {
    const { name, description } = form;

    try {
      const plotId = await plotListStore.createPlot(name, description);

      if (plotId) {
        closeCreateNewPlotPopover();
        resetForm();
        notifier.showMessage(t('messages.success'), t(plotListTranslations.messages.wasCreated), false);
      }
    } catch (e) {
      updateContextErrors?.(e);
    }
  }

  function openCreateNewPlotPopover(): void {
    setIsEditPlotDrawerOpen(true);
  }

  function closeCreateNewPlotPopover(): void {
    setIsEditPlotDrawerOpen(false);
  }

  function onEditPlot(plotId: string): void {
    const plot = plotListStore.plots.find(({ id }) => id === plotId);

    if (!plot) {
      return;
    }

    resetForm({
      description: plot.description ?? '',
      id: plot.id,
      name: plot.name,
      status: form.status,
    });

    setIsEditPlotDrawerOpen(true);
  }

  async function onNavigateToPlotHandler(): Promise<void> {
    await store.setCurrentPlot(form.id);
    navigate(ROUTES.home);
  }

  return (
    <ScreenView
      header={{
        title: t('pages.plotList.caption'),
      }}
    >
      <Flex direction="column" justify="flex-start" align="flex-start" gapX={12}>
        {plotListStore.plots.map((plot: PlotDTO) => (
          <ListItem onOpen={onNavigateToPlotHandler} key={plot.id} onEdit={onEditPlot} propertyId={plot.id ?? ''} caption={plot.name} />
        ))}
      </Flex>

      <Flex gapY={40}>{!plotListStore.plots.length && <Typography color="accentDarkBlue">{t(plotListTranslations.messages.emptyList)}</Typography>}</Flex>

      <IconButton onPress={openCreateNewPlotPopover} iconType="plus" size={40} color="primary" />

      <CreateEntityWidget
        onApply={!form.id ? createPlot : updatePlot}
        onDelete={form.id ? deletePlot : undefined}
        caption={t(!form.id ? plotListTranslations.actions.addNew : plotListTranslations.actions.update)}
        isOpen={isEditPlotDrawerOpen}
        onClose={closeCreateNewPlotPopover}
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

        <UIInput
          error={formErrors.description}
          multiline
          maxValueLength={BIG_VALUE_MAX_LENGTH}
          name="description"
          value={form.description}
          onChange={setFormFieldData}
          label={t(plotListTranslations.labels.description)}
        />
      </CreateEntityWidget>
    </ScreenView>
  );
};
