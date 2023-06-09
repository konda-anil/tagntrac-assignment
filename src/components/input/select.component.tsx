import React, {useState} from 'react';
import {View, TextInput, Text, TextStyle, StyleProp} from 'react-native';

import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {Icon, SelectOptionProps, Menu} from '@components';

import {colors} from '@core/theme';

export type SelectProps = {
  placeholder?: string;
  errorMessage?: string;
  ref?: any;
  style?: StyleProp<TextStyle>;
  selectedOption?: string;
  onSelect: (string) => void;
  options: SelectOptionProps[];
};

export const Select = ({
  errorMessage,
  placeholder,
  ref,
  style,
  selectedOption,
  onSelect,
  options,
}: SelectProps) => {
  const onSelectChange = (option: SelectOptionProps) => {
    onSelect(option.value);
  };

  return (
    <Menu
      options={options}
      onSelect={onSelectChange}
      style={[styles.container, style]}
      customStyles={{
        optionsContainer: {
          marginTop: verticalScale(50),
          width: scale(75),
        },
      }}>
      <>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            ref={ref}
            value={
              options.find(option => option.value === selectedOption)?.label
            }
            editable={false}
          />

          <Icon
            name={'caret-down-outline'}
            color={colors.greyMedium}
            size={20}
            style={styles.icon}
            design={'ionicons'}
          />
        </View>

        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </>
    </Menu>
  );
};

const styles = ScaledSheet.create({
  container: {},
  inputWrapper: {},
  input: {
    borderBottomColor: colors.inputBorder,
    borderBottomWidth: 1,
    color: colors.greyMedium,
    fontSize: '14@s',
    fontFamily: 'Roboto-Regular',
    paddingVertical: '10@vs',
  },
  errorMessage: {
    color: colors.errorColor,
    fontFamily: 'Roboto-Regular',
    fontSize: '12@s',
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: '15@vs',
  },
});
