import React from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';

import {
  Menu as AppMenu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuOptionsCustomStyle,
} from 'react-native-popup-menu';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';

import { colors } from '@core/theme';

export type SelectOptionProps = {
  label: string;
  value: string;
}

export type MenuProps = {
  options: SelectOptionProps[];
  style?: StyleProp<ViewStyle>;
  onSelect?: (option: SelectOptionProps) => void;
  children?: JSX.Element;
  customStyles?: MenuOptionsCustomStyle
}

export const Menu = ({
  options,
  style,
  onSelect,
  children,
  customStyles,
}: MenuProps) => {
  return (<AppMenu style={[styles.container, style]}>
    <MenuTrigger>
      { children }
    </MenuTrigger>

    <MenuOptions customStyles={customStyles}>
      {
        options.map((option, index) => {
          return (<MenuOption 
            key={index}
            onSelect={() =>  onSelect && onSelect(option)}
            customStyles={{
              optionWrapper: {
                height: verticalScale(30),
                borderBottomColor: colors.inputBorder,
                borderBottomWidth: 1,
              }
            }}
            >
            <Text style={styles.optionText}>{option.label}</Text>    
        </MenuOption>)
        })
      }
    </MenuOptions>
    
  </AppMenu>)
}


const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.background
  },
  optionText: {
    fontSize: '12@s',
    fontFamily: 'Roboto-Regular',
    color: colors.text,
    textAlign: 'center',
  }
});