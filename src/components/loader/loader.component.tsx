import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { colors } from '@core/theme';


export const Loader = () => {
  return <Modal
  animationType="fade"
  transparent
  visible={true}
  onRequestClose={() => {}}>
  <View style={styles.container}>
    <ActivityIndicator
      color={colors.primary}
      size="large"
    />
  </View>
</Modal>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }
})