import {
  Dimensions as ScreenDimentions,
} from 'react-native';

const screenHeight: number = ScreenDimentions.get('window').height;
const screenWidth: number = ScreenDimentions.get('window').width;

export const Dimensions = {
  height: screenHeight,
  width: screenWidth,
}