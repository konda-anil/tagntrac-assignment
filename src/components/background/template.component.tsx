import React from 'react';
import {
  Image,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import {
  Button,
  KeyboardAwareView,
  TopBar,
} from '@components';

import { colors } from '@core/theme'

export type ActionTemplateProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element;
  description?: string;
  image: any;
  action: () => void;
  actionButtonText: string;
  goBack: () => void;
}


export const ActionTemplate = ({
  title,
  children,
  style,
  description,
  image,
  action,
  actionButtonText,
  goBack,
}: ActionTemplateProps) => {
  return (<KeyboardAwareView 
    style={[styles.container, style]}
  >
    <TopBar
      title={title}
      onClick={goBack}
    />
    <View style={styles.contentContainer}>
      <View style={styles.header}>
        <View
          style={styles.outerCircle}
        >
          <View style={styles.innerCircle}>
            <Image
              source={image}
            />
          </View>
        </View>

        {description && <View style={styles.description}>
          <Text style={styles.descriptionText}>
            { description }
          </Text>
        </View>}
        { children }
      </View>


      <Button
        title={actionButtonText}
        style={styles.button}
        onClick={action}
      />
    </View>

  </KeyboardAwareView>)
}


const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: colors.background
  },
  body: {
    backgroundColor: colors.background
  },
  outerCircle: {
    height: '196@vs',
    width: '196@vs',
    borderRadius: '196@vs',
    borderWidth: '10@s',
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',     
    backgroundColor: colors.primaryMedium,
    alignSelf: 'center',
  },
  innerCircle: {
    height: '176@vs',
    width: '176@vs',
    backgroundColor: colors.primaryLight,
    borderRadius: '176@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '10@s',
    borderColor: colors.primaryMedium,
  },
  description: {
    marginVertical: '20@vs',
    marginHorizontal: '40@s',
  },
  descriptionText: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: '14@s',
    textAlign: 'center',
    color: colors.text
  },
  button: {
    width: '273@s',
    marginBottom: '20@vs',
    alignSelf: 'center'
  }
})