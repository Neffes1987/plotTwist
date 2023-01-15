import React, { ReactElement } from 'react';
import { NotifierWrapper } from 'react-native-notifier';
import 'intl-pluralrules';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './initI18n/initI18n';
import { components } from '../Screens';
import { ROUTES } from '../Screens/routes';

import { DEFAULT_ROUTE_OPTIONS } from './constants';
import { ErrorBoundaryProvider } from './hooks/ErrorBoundaryContext/ErrorBoundaryContext';
import { useSetErrorToErrorsContext } from './hooks/ErrorBoundaryContext/useSetErrorToErrorsContext';

const Stack = createStackNavigator();

const App = (): ReactElement => {
  const { errors, onErrorHandler } = useSetErrorToErrorsContext();

  return (
    <ErrorBoundaryProvider.Provider value={{ errors, updateContextErrors: onErrorHandler }}>
      <NotifierWrapper>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={ROUTES.loading}>
            <Stack.Screen name={ROUTES.loading} component={components.Loading} options={DEFAULT_ROUTE_OPTIONS} />

            <Stack.Screen name={ROUTES.home} component={components.Home} options={DEFAULT_ROUTE_OPTIONS} />

            <Stack.Screen name={ROUTES.plotList} component={components.PlotList} options={DEFAULT_ROUTE_OPTIONS} />

            <Stack.Screen name={ROUTES.worldConstructor} component={components.WorldEditor} options={DEFAULT_ROUTE_OPTIONS} />

            <Stack.Screen name={ROUTES.oops} component={components.OopsErrorScreen} options={DEFAULT_ROUTE_OPTIONS} />

            <Stack.Screen name={ROUTES.laws} component={components.Laws} options={DEFAULT_ROUTE_OPTIONS} />

            <Stack.Screen name={ROUTES.waterholes} component={components.Waterholes} options={DEFAULT_ROUTE_OPTIONS} />

            <Stack.Screen name={ROUTES.aboutEdge} component={components.EdgeEditor} options={DEFAULT_ROUTE_OPTIONS} />
          </Stack.Navigator>
        </NavigationContainer>
      </NotifierWrapper>
    </ErrorBoundaryProvider.Provider>
  );
};

export default App;
