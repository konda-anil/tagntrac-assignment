import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {RootNavigator} from '@core/navigation';

import {colors} from '@core/theme';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import {store} from '@core/store';

export const Root = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <MenuProvider backHandler={true}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.statusBar}
          />
          <RootNavigator />
        </MenuProvider>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
