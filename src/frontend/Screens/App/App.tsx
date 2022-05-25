import React, { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, useColorScheme, View } from 'react-native';
import { Colors, LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import 'intl-pluralrules';

import './initI18n/initI18n';
import { Accordion } from '../../UI/Accordion/Accordion';
import { IconButton } from '../../UI/Buttons/IconButton';
import { Drawer } from '../../UI/Drawer/Drawer';
import { Flex } from '../../UI/Flex/Flex';
import { Spinner } from '../../UI/Spinner/Spinner';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenHeader } from '../../Widgets/ScreenHeader/ScreenHeader';

const App = (): ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [state, setState] = useState(false);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <ScreenHeader title="test" onBackClick={console.log} onSettingClick={console.log} />

        <Spinner />

        <Accordion caption="test">
          <ScreenHeader title="test" onBackClick={console.log} onSettingClick={console.log} />
        </Accordion>

        <Flex justify="space-around" direction="column">
          <IconButton
            size={22}
            iconType="close"
            color="accentDarkBlue"
            onPress={() => {
              setState(true);
            }}
          />

          <Drawer
            isOpen={state}
            caption="test captions"
            onClose={() => {
              setState(false);
            }}
          >
            <Typography mode="body-bold">test</Typography>

            <Typography mode="label">test1</Typography>

            <Typography>test3</Typography>
          </Drawer>
        </Flex>

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
