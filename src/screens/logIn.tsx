import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions, Alert} from 'react-native';
import {Card, CardItem, Button} from 'native-base';
import fontStyles from '_styles/font/fontStyle';
import MyForm, {FormInputs} from '_components/form';
import {ScrollView} from 'react-native-gesture-handler';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {StackNavigationProp} from '@react-navigation/stack';
import {singIn, isLoggedIn} from '_network/firebase';
import Spinner from 'react-native-loading-spinner-overlay';

interface Props {
  navigation: StackNavigationProp<any>;
}
interface State {
  loading: boolean;
}
class LogInScreen extends Component<Props, State> {
  state: State = {loading: false};

  constructor(props: Readonly<Props>) {
    super(props);
    isLoggedIn()
      ? this.props.navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        })
      : null;
  }
  signIn(formInputs: FormInputs) {
    this.setState({
      loading: true,
    });
    singIn(
      formInputs.email!,
      formInputs.password!,
      () => {
        this.setState({
          loading: false,
        });
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      },
      (error) => {
        this.setState({
          loading: false,
        });

        if (
          error.code === 'auth/invalid-email' ||
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          Alert.alert('Error', 'wrong Email or password');
        }
      },
    );
  }

  render() {
    // let width = Dimensions.get('window').width; //full width
    let height = Dimensions.get('window').height;
    if (ExtraDimensions.isSoftMenuBarEnabled()) {
      height = height - ExtraDimensions.getStatusBarHeight();
    }
    return (
      <ScrollView style={{height, flex: 1}}>
        <View style={(styles.container, {height})}>
          <Spinner visible={this.state.loading} />
          <View style={[styles.row, styles.logoContainer]}>
            <View style={[styles.logoCard]}>
              <View style={styles.logoItem}>
                <Text style={fontStyles.logInLogo}>Be</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <MyForm
              email
              password
              submitText={'Log in'}
              onSubmit={(e) => this.signIn(e)}
            />
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                transparent
                onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                <Text style={fontStyles.mainButtonNoBackground}>Sign up</Text>
              </Button>
            </View>
          </View>
          <View style={styles.row} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    // height: '100%',
  },
  row: {flex: 1},
  logoCard: {
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
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
export default LogInScreen;
