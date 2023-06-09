import React, {useEffect} from 'react';

import {AppIntroSlider, AppIntroSliderItemProps} from '@components';

import SplashScreen from 'react-native-splash-screen';

import {StackNavigationRoute} from '@core/navigation/models';

const appIntroSliderItems: AppIntroSliderItemProps[] = [
  {
    title: 'About Tag-N-Trac',
    description: `Tag-N-Trac was founded with the vision to provide customers with a full stack IoT solution by integrating multiple modes of hardware, software, and data technology to build smarter solutions that solve complex problems.`,
    image: require('@assets/images/app-intro/logo.png'),
  },
];

export const AppIntroScreen = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const onClickGetStarted = () => {
    navigation.reset({
      index: 0,
      routes: [{name: StackNavigationRoute.Login}],
    });
  };

  return (
    <AppIntroSlider
      screens={appIntroSliderItems}
      onClickAction={onClickGetStarted}
    />
  );
};
