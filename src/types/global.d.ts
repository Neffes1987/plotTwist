type Nullable<T> = T | null;

type ValueOf<T> = T[keyof T];

interface Navigation {
  navigate: (route: string, options?: Record<string, unknown>) => void;
}

interface SelectOption {
  id: string;
  name: string;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
