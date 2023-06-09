import React from 'react';
import {
  StyleProp,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';


export type EmtpyProps = {
  message: string;
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export const Empty = ({ 
  message,
  style,
}: EmtpyProps) => {
  return (<View style={style}>
    <Text>{message}</Text>
  </View>)
}