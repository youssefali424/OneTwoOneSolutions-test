import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ImageURISource,
  Image,
} from 'react-native';
import {Card, CardItem} from 'native-base';
import MyForm, {FormInputs} from '_components/form';
import {ScrollView} from 'react-native-gesture-handler';
import {createAccount, singOut} from '_network/firebase';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderHeight} from '_molecules/headers/mainHeader';
import Spinner from 'react-native-loading-spinner-overlay';

interface State {
  imageSource?: ImageURISource;
  loading: boolean;
}
class SignUpScreen extends Component<any, State> {
  imagePath?: string;
  state: State = {loading: false};
  signUp(formInputs: FormInputs) {
    this.setState({
      loading: true,
    });
    createAccount(
      formInputs.email!,
      formInputs.name!,
      formInputs.password!,
      () => {
        singOut();
        this.setState({
          loading: false,
        });
        Alert.alert(
          'success',
          `${formInputs.name!} you successfully created an account`,
        );
      },
      this.imagePath,
      (e) => {
        this.setState({
          loading: false,
        });
        Alert.alert('Error', `Error message :${e}`);
      },
    );
  }
  chooseImage() {
    console.log('image');
    ImagePicker.showImagePicker(
      {mediaType: 'photo', quality: 0.3},
      (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          this.setState({
            imageSource: undefined,
          });
        } else {
          const source = {uri: response.uri};
          this.imagePath = response.path;
          this.setState({
            imageSource: source,
          });
        }
      },
    );
  }
  render() {
    // let width = Dimensions.get('window').width; //full width
    let height = Dimensions.get('window').height - HeaderHeight;
    if (ExtraDimensions.isSoftMenuBarEnabled()) {
      height = height - ExtraDimensions.getStatusBarHeight();
    }

    return (
      <ScrollView style={{height, flex: 1}}>
        <View style={(styles.container, {height})}>
          <Spinner visible={this.state.loading} />
          <View style={[styles.imageContainer]}>
            <Card style={[styles.imageCard]}>
              <CardItem
                button
                onPress={() => this.chooseImage()}
                style={styles.imageItem}>
                {this.state.imageSource ? (
                  <Image
                    style={styles.image}
                    source={this.state.imageSource}
                    resizeMode="cover"
                  />
                ) : (
                  <Icon size={40} color="#3B3C4E" name="ios-camera" />
                )}
              </CardItem>
            </Card>
          </View>
          <View style={{flex: 5}}>
            <MyForm
              email
              password
              name
              submitText={'Create a new account'}
              onSubmit={(e) => this.signUp(e)}
            />
          </View>
          {/* <View style={styles.row} /> */}
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
export default SignUpScreen;
