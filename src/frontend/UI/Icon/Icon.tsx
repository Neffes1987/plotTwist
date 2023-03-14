import React, { ReactElement, SVGProps } from 'react';
import { Image } from 'react-native';

import ActivePlot from './assets/active-plot.svg';
import Attention from './assets/attention.svg';
import Chat from './assets/chat.svg';
import Chevron from './assets/chevron.svg';
import Close from './assets/close.svg';
import Edge from './assets/edge.svg';
import Events from './assets/events.svg';
import Faq from './assets/faq.svg';
import Flame from './assets/flame.svg';
import Gavel from './assets/gavel.svg';
import Gear from './assets/gear.svg';
import List from './assets/list.svg';
import Pencil from './assets/pencil.svg';
import Person from './assets/person.svg';
import Place from './assets/place.svg';
import Plot from './assets/plot.svg';
import Plus from './assets/plus.svg';
import Search from './assets/search.svg';
import Task from './assets/task.svg';
import Tick from './assets/tick.svg';

import { UI_COLORS } from '../colors';
import { IconProps, IconType } from '../interface';

// @ts-ignore
export const Icons: Record<IconType, React.FunctionComponent<SVGProps> | undefined> = {
  attention: Attention,
  chevron: Chevron,
  close: Close,
  faq: Faq,
  flame: Flame,
  gear: Gear,
  pencil: Pencil,
  plot: Plot,
  plus: Plus,
  search: Search,
  tick: Tick,
  logo: undefined,
  chat: Chat,
  events: Events,
  place: Place,
  person: Person,
  list: List,
  gavel: Gavel,
  edge: Edge,
  task: Task,
  'active-plot': ActivePlot,
};

export const Icon = (props: IconProps): Nullable<ReactElement> => {
  const { type, color = 'accentDarkBlue', rotate = 0, size = 14 } = props;

  const iconProps = {
    testID: type,
    name: type,
    fill: color ? UI_COLORS[color] : undefined,
    color: color ? UI_COLORS[color] : undefined,
    style: {
      transform: [
        {
          rotate: `${rotate}deg`,
        },
      ],
      width: size,
      height: size,
    },
  };

  if (type === 'logo') {
    return <Image testID={type} source={require('./assets/logo.png')} style={{ width: size, height: size }} />;
  }

  const Element = Icons[type];

  if (!Element) {
    return null;
  }

  return <Element {...iconProps} />;
};
