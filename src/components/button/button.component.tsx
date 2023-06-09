import React from 'react'
import {
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { colors } from '@core/theme';


export type ButtonProps = {
  title: string;
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const Button = ({
  title,
  onClick,
  style = {},
  textStyle= {},
  disabled,
}: ButtonProps) => {
  return <Pressable
    style={[styles.button, style, disabled ? styles.disabled: {}]}
    onPress={onClick}
    disabled={disabled}
  >
    <Text style={[styles.text, textStyle]}>
      {title}
    </Text>
  </Pressable>
}

const styles = ScaledSheet.create({
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 10,
    height: '43@vs',
    justifyContent: 'center'    
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: '16@s',
    color: colors.white,
    fontFamily: 'Roboto-Medium',
  },
})