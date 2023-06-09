import React from 'react';
import { StyleSheet } from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import {
  Box,
  Icon,
} from '@components';

import { colors } from "@core/theme"

export type TabBarIconProps = {
  active: boolean;
  icon: string;
}

export const TabBarIcon = ({
  active,
  icon,
}: TabBarIconProps) => {
  return (<Box
    style={[styles.tab, active ? styles.activeTab: styles.inactiveTab]}
  >
    <Icon 
      name={icon}
      size={25}
      color={active ? colors.primary: colors.white}
    />

  </Box>)
}

const styles = ScaledSheet.create({
  tab: {
    paddingVertical: '10@vs',
    paddingHorizontal: '10@s',
    elevation: 5,
    height: '45@vs',
    aspectRatio: 1,
    borderRadius: '45@vs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.white,
  },
  inactiveTab: {
    backgroundColor: colors.primary,
  }
})