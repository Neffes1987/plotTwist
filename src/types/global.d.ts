import React, { PropsWithChildren } from 'react';

type Nullable<T> = T | null;

type ValueOf<T> = T[keyof T];

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
