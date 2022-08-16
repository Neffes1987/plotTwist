import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlotDTO } from 'backend';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';

import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../constants';
import { useForm } from '../../App/hooks/useForm';
import notifier from '../../App/notify/notify';
import store from '../../store/Store';
import { IconButton } from '../../UI/Buttons/IconButton';
import { UIButton } from '../../UI/Buttons/UIButton';
import { Drawer } from '../../UI/Drawer/Drawer';
import { Flex } from '../../UI/Flex/Flex';
import { ListItem } from '../../UI/ListItem/ListItem';
import { Typography } from '../../UI/Typography/Typography';
import { UIInput } from '../../UI/UIInput/UIInput';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { ROUTES } from '../routes';

import { DEFAULT_FORM_VALUES } from './constants';
import { plotListStore } from './PlotListStore';

export const PlotList = observer(
  (): ReactElement => {
    const { t } = useTranslation();
    const { navigate } = useNavigation<Navigation>();
    const [isEditPlotDrawerOpen, setIsEditPlotDrawerOpen] = useState(false);
    const { form, setFormFieldData, formErrors, resetForm, formatBackendError } = useForm<Omit<PlotDTO, 'worlds'>>(DEFAULT_FORM_VALUES, DEFAULT_FORM_VALUES);

    useEffect(() => {
      plotListStore.list().catch(console.error);
    }, []);

    useEffect(() => {
      if (plotListStore.error) {
        formatBackendError(plotListStore.error);
      }
    }, [plotListStore.error]);

    async function updatePlot(): Promise<void> {
      await plotListStore.updatePlot(form);

      resetForm();
      closeCreateNewPlotPopover();
    }

    async function deletePlot(): Promise<void> {
      await plotListStore.deletePlot(form.id);
      resetForm();
      closeCreateNewPlotPopover();
    }

    async function createPlot(): Promise<void> {
      const { name, description } = form;

      const plotId = await plotListStore.createPlot(name, description);

      if (plotId) {
        closeCreateNewPlotPopover();
        resetForm();
        notifier.showMessage(t('messages.success'), t('pages.plotList.messages.wasCreated'), false);
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
        <Flex direction="column" justify="flex-start" align="flex-start">
          {plotListStore.plots.map((plot: PlotDTO) => (
            <ListItem key={plot.id} onPress={onEditPlot} propertyId={plot.id ?? ''} caption={plot.name} />
          ))}
        </Flex>

        <Flex gapY={40}>{!plotListStore.plots.length && <Typography color="accentDarkBlue">{t('pages.plotList.messages.emptyList')}</Typography>}</Flex>

        <IconButton onPress={openCreateNewPlotPopover} iconType="plus" size={40} color="primary" />

        <Drawer caption={t('pages.plotList.actions.addNew')} isOpen={isEditPlotDrawerOpen} onClose={closeCreateNewPlotPopover}>
          <UIInput
            maxValueLength={SHORT_VALUE_MAX_LENGTH}
            error={formErrors.name}
            name="name"
            value={form.name}
            onChange={setFormFieldData}
            label={t('pages.plotList.labels.name')}
          />

          <UIInput
            error={formErrors.description}
            multiline
            maxValueLength={BIG_VALUE_MAX_LENGTH}
            name="description"
            value={form.description}
            onChange={setFormFieldData}
            label={t('pages.plotList.labels.description')}
          />

          {!form.id ? (
            <UIButton onPress={createPlot} type="primary">
              {t('pages.plotList.actions.addNew')}
            </UIButton>
          ) : (
            <Flex direction="column">
              <Flex>
                <UIButton onPress={updatePlot} type="primary" fullWidth>
                  {t('pages.plotList.actions.update')}
                </UIButton>
              </Flex>

              <Flex gapY={12}>
                <UIButton onPress={deletePlot} type="secondary" fullWidth>
                  {t('pages.plotList.actions.delete')}
                </UIButton>
              </Flex>

              <Flex>
                <UIButton onPress={onNavigateToPlotHandler} type="secondary" fullWidth>
                  {t('pages.plotList.actions.open')}
                </UIButton>
              </Flex>
            </Flex>
          )}
        </Drawer>
      </ScreenView>
    );
  },
);
