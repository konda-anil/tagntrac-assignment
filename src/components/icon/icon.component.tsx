import React from 'react';
import {
  StyleProp,
  TextStyle,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { verticalScale } from 'react-native-size-matters';

export interface IconType {
  type: string;
  name: string
}

export interface IconProps {
  name: string,
  design?: string,
  color: string,
  size: number,
  style?: StyleProp<TextStyle>
}

export const Icon = ({
  name,
  design,
  color,
  size,
  style = {}
}: IconProps) => {
  switch(design) {
    case 'ionicons':
      return (<Ionicons
        style={style}
        name={name}
        color={color}
        size={verticalScale(size)}
      />);

    case 'MaterialIcons':
      return (<MaterialIcons
        style={style}
        name={name}
        color={color}
        size={verticalScale(size)}
      />);
    case 'EvilIcons':
      return (<EvilIcons
        style={style}
        name={name}
        color={color}
        size={verticalScale(size)}
      />);
    default:
      return (<AntDesign
        style={style}
        name={name}
        color={color}
        size={verticalScale(size)}
      />);
  }
}