import React, { ReactElement } from 'react';
import { Image } from 'react-native';

import Attention from './assets/attention.svg';
import Chevron from './assets/chevron.svg';
import Close from './assets/close.svg';
import Faq from './assets/faq.svg';
import Flame from './assets/flame.svg';
import Gear from './assets/gear.svg';
import Pencil from './assets/pencil.svg';
import Plus from './assets/plus.svg';
import Search from './assets/search.svg';
import Tick from './assets/tick.svg';

import { UI_COLORS } from '../colors';
import { IconProps } from '../interface';

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

  switch (type) {
    case 'chevron':
      return <Chevron {...iconProps} />;
    case 'close':
      return <Close {...iconProps} />;
    case 'faq':
      return <Faq {...iconProps} />;
    case 'gear':
      return <Gear {...iconProps} />;
    case 'pencil':
      return <Pencil {...iconProps} />;
    case 'plus':
      return <Plus {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'tick':
      return <Tick {...iconProps} />;
    case 'attention':
      return <Attention {...iconProps} />;
    case 'flame':
      return <Flame {...iconProps} />;
    case 'logo':
      return <Image testID={type} source={require('./assets/logo.png')} style={{ width: size, height: size }} />;
    default:
      return null;
  }
};
