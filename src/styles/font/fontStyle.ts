import {StyleSheet} from 'react-native';
import fontSizes from './fontSize';

const fontStyles = StyleSheet.create({
  placeHolder: {
    fontSize: fontSizes[4],
  },
  intro: {
    color: '#3B3C4E',
    fontSize: fontSizes[3],
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: fontSizes[7],
    fontWeight: 'bold',
  },
  mainButton: {
    color: '#FFFFFF',
    fontSize: fontSizes[3],
    textAlign: 'center',
  },
  mainButtonNoBackground: {
    color: '#3B3C4E',
    fontSize: fontSizes[3],
    textAlign: 'center',
  },
  header: {
    color: '#3B3C4E',
    fontSize: fontSizes[4],
    textAlign: 'left',
  },
  error: {
    fontSize: fontSizes[2],
    color: 'red',
  },
  userInfo: {
    fontSize: fontSizes[3],
    textAlign: 'center',
  },
});
export default fontStyles;
