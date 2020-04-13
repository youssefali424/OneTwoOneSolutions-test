/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useRef} from 'react';
import {StatusBar} from 'react-native';

import {MainNavigator} from '_navigation/mainNavigator';
import RNBootSplash from 'react-native-bootsplash';
import {isPassedIntro} from '_screens/Intro';

const App = () => {
  let initialRoot = useRef('Intro');
  useEffect(() => {
    isPassedIntro().then((e) => {
      initialRoot.current = e ? 'Intro' : 'LogInScreen';
      RNBootSplash.hide({duration: 250});
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
      <MainNavigator initialRoot={initialRoot.current} />
      {/* </SafeAreaView> */}
    </>
  );
};

export default App;
