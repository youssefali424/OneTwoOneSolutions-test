import React from 'react';
import {View, StyleSheet, Text, ViewStyle} from 'react-native';
import fontStyles from '_styles/font/fontStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  header: string;
  onBack: () => void;
  style?: ViewStyle;
}
export const HeaderHeight = 50;
const Header = (props: Props) => {
  //   let width = Dimensions.get('window').width; //full width
  //   let height = Dimensions.get('window').height;
  return (
    <View style={[props.style, styles.container, {height: HeaderHeight}]}>
      <Icon
        style={styles.backButton}
        onPress={props.onBack}
        name={'md-arrow-round-back'}
        color="#000000"
        size={35}
      />
      <Text style={[fontStyles.header, styles.headerStyle]}>
        {props.header}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //   flex: 1
  },
  backButton: {
    flex: 1,
    padding: 7,
  },
  headerStyle: {
    flex: 8,
    padding: 5,
  },
});

export default Header;
