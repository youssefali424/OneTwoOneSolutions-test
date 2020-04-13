import React, {Component} from 'react';
import {Button, View, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import fontStyles from '_styles/font/fontStyle';

interface Props {
  onclick: () => void;
  text: string;
}
class MainButton extends Component<Props> {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          // textStyle={fontStyles.mainButton}
          color="#3B3C4E"
          onPress={this.props.onclick}>
          <Text style={fontStyles.mainButton}>{this.props.text}</Text>
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
  },
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#3B3C4E',
  },
});
export default MainButton;
