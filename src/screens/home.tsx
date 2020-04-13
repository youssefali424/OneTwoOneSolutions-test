import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, Alert} from 'react-native';
import {Card, CardItem, Button} from 'native-base';
import {singOut, getCurrentUser} from '_network/firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import fontStyles from '_styles/font/fontStyle';
import MainButton from '_molecules/buttons/mainButton';

interface State {
  user?: User;
}
interface User {
  displayName: string;
  photoURL: string;
  email: string;
}
class HomeScreen extends Component<any, State> {
  state: State = {};
  constructor(props: any) {
    super(props);
    this.state = {
      user: getCurrentUser() as User,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.imageContainer]}>
          <Card style={[styles.imageCard]}>
            <CardItem button style={styles.imageItem}>
              {this.state.user?.photoURL ? (
                <Image
                  style={styles.image}
                  source={{uri: this.state.user?.photoURL}}
                  resizeMode="cover"
                />
              ) : (
                <Icon size={40} color="#3B3C4E" name="ios-camera" />
              )}
            </CardItem>
          </Card>
        </View>
        <View style={{flex: 5}}>
          <Text
            style={
              fontStyles.userInfo
            }>{`Welcome ${this.state.user?.displayName}`}</Text>
          <Text
            style={
              fontStyles.userInfo
            }>{`Email: ${this.state.user?.email}`}</Text>
          <View style={[styles.button]}>
            <MainButton
              onclick={() =>
                singOut(
                  () =>
                    this.props.navigation.reset({
                      index: 0,
                      routes: [{name: 'LogInScreen'}],
                    }),
                  () =>
                    Alert.alert('Error', "COuldn't sign out please try again"),
                )
              }
              text={'Sign out'}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    flex: 1,
  },
  buttonContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  row: {flex: 1},
  imageCard: {
    borderRadius: 50,
    backgroundColor: '#e6e7e8',
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
  },
  imageContainer: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    flexDirection: 'row',
    flex: 2,
  },
  imageItem: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 50,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  image: {width: 100, height: 100, borderRadius: 50},
});
export default HomeScreen;
