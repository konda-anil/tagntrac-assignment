import React from 'react';
import { View } from 'react-native';

import { verticalScale } from 'react-native-size-matters';


export type SeperatorProps = {
  spacing: number;
}

export const Seperator = ({ 
  spacing
}: SeperatorProps) => {
  return <View style={{height: verticalScale(spacing)}}/>
}