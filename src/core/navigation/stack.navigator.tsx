import React from 'react';

import {
  AddProductScreen,
  AdminHomeScreen,
  AppIntroScreen,
  DelieveryPartnerHomeScreen,
  LoginScreen,
  ProductDetailsScreen,
  SignUpScreen,
  UserHomeScreen,
} from '@screens';

import {createStackNavigator} from '@react-navigation/stack';

import {
  StackNavigationOptions,
  StackNavigationRoute,
} from '@core/navigation/models';

const Stack = createStackNavigator();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={StackNavigationOptions}>
      <Stack.Screen
        name={StackNavigationRoute.AppIntro}
        component={AppIntroScreen}
      />
      <Stack.Screen name={StackNavigationRoute.Login} component={LoginScreen} />
      <Stack.Screen
        name={StackNavigationRoute.AdminHome}
        component={AdminHomeScreen}
        // options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNavigationRoute.UserHome}
        component={UserHomeScreen}
      />
      <Stack.Screen
        name={StackNavigationRoute.DelieveryPartnerHome}
        component={DelieveryPartnerHomeScreen}
      />
      <Stack.Screen
        name={StackNavigationRoute.AddProduct}
        component={AddProductScreen}
      />
      <Stack.Screen
        name={StackNavigationRoute.ProductDetails}
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name={StackNavigationRoute.SignUp}
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};
