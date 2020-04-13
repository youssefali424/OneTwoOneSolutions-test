import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Card, CardItem} from 'native-base';
import fontStyles from '_styles/font/fontStyle';
import MainButton from '_molecules/buttons/mainButton';
import AsyncStorage from '@react-native-community/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';

interface Props {
  navigation: StackNavigationProp<any>;
}
const Intro = (props: Props) => {
  //   let width = Dimensions.get('window').width; //full width
  //   let height = Dimensions.get('window').height;
  isPassedIntro()
    .then((e) => {
      e
        ? props.navigation.reset({
            index: 0,
            routes: [{name: 'LogInScreen'}],
          })
        : null;
    })
    .catch(console.error);
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.logoContainer]}>
        <Card style={[styles.logoCard]}>
          <CardItem style={styles.logoItem}>
            <Text style={fontStyles.logo}>Be</Text>
          </CardItem>
        </Card>
      </View>
      <View style={styles.row}>
        <Text style={fontStyles.intro}>
          {'Showcase&Discover Creative Work'}
        </Text>
      </View>
      <View style={[styles.row, styles.button]}>
        <MainButton
          text={'Get Started'}
          onclick={() => {
            passedIntro()
              .then(() => props.navigation.navigate('LogInScreen'))
              .catch(console.error);
          }}
        />
      </View>
    </View>
  );
};
const passedIntro = async () => {
  await AsyncStorage.setItem('@passedIntro', '@passedIntro');
};
const isPassedIntro = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem('@passedIntro');
  if (value !== null) {
    return true;
  } else {
    return false;
  }
};
const styles = StyleSheet.create({
  button: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    height: '100%',
  },
  row: {flex: 1},
  logoCard: {
    borderRadius: 20,
    backgroundColor: '#3B3C4E',
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
    paddingBottom: 10,
  },
  logoContainer: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    flexDirection: 'row',
  },
  logoItem: {
    padding: 10,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});
export default Intro;
