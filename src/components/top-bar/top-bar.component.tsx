import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import { Icon } from '@components';

import { colors } from '@core/theme';


export type TopBarProps = {
  onClick: () => void;
  title: string;
}

export const TopBar = ({
  title,
  onClick
}: TopBarProps) => {
  return (
    <View
      style={styles.container}>

      <Pressable onPress={onClick}>
        <Icon
          name='chevron-back'
          size={30}
          design='ionicons'
          color={colors.black}
        />
      </Pressable>

      <Text style={styles.title}>
        { title }
      </Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingVertical: '18@vs',
    paddingHorizontal: '18@s'
  },
  title: {
    fontSize: '20@s',
    color: colors.black,
    fontFamily: 'Roboto-Bold',
    marginLeft: '15@s'
  }
});