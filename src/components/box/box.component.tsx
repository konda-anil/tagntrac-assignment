import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle
} from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';

import { colors } from '@core/theme';


export type BoxProps = {
  children?: JSX.Element;
  style?: StyleProp<ViewStyle>
}

export const Box = ({
  children,
  style
}: BoxProps) => {
  return <View style={[styles.box, style]}>
    { children }
  </View>
}

const styles = ScaledSheet.create({
  box: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 20,
    paddingVertical: '20@vs',
    paddingHorizontal: '20@s',
    elevation: 10,
    borderRadius: 20,
    backgroundColor: colors.background,
  } 
});