import { PlotDTO } from 'backend';

export const DEFAULT_FORM_VALUES: Omit<PlotDTO, 'worlds'> = {
  id: '',
  name: '',
  description: '',
  status: 'draft',
};
