import React from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  TextStyle,
  StyleProp,
  KeyboardTypeOptions,
} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';

import {Icon} from '@components';

import {colors} from '@core/theme';

export type InputProps = {
  placeholder?: string;
  errorMessage?: string;
  reference?: any;
  icon?: string;
  iconType?: string;
  onClickIcon?: () => void;
  style?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value?: string | number;
  editable?: boolean;
  onChange?: (string) => void;
};

export const Input = ({
  errorMessage,
  placeholder,
  reference,
  icon,
  iconType,
  onClickIcon,
  style,
  secureTextEntry,
  keyboardType,
  value,
  editable = true,
  onChange,
}: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputWrapper}>
        <TextInput
          ref={reference}
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value as string}
          editable={editable}
          onChangeText={onChange}
        />

        {icon && iconType && (
          <Pressable onPress={onClickIcon}>
            <Icon
              name={icon}
              color={colors.greyMedium}
              size={20}
              style={styles.icon}
              design={iconType}
            />
          </Pressable>
        )}
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
  },
  inputWrapper: {
    width: '100%',
  },
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
    backgroundColor: colors.background,
  },
});
