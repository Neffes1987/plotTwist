import React, { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme, View } from 'react-native';
import { Colors, Header, LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';

import { IconButton } from './UI/Buttons/IconButton';
import { Drawer } from './UI/Drawer/Drawer';
import { Flex } from './UI/Flex/Flex';
import { Typography } from './UI/Typography/Typography';

const App = (): ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [state, setState] = useState(false);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />

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
