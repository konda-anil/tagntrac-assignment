import React from 'react';
import {Image, Text, View} from 'react-native';

import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import {RandomBackgroundIcons, Box} from '@components';

import {colors} from '@core/theme';
import {Dimensions} from '@utils';

export interface AppIntroHeaderProps {
  image: any;
}

export interface AppIntroContentsProps {
  title: string;
  description: string;
}

export interface AppIntroSliderItemProps
  extends AppIntroHeaderProps,
    AppIntroContentsProps {}

const AppIntroHeader = ({image}: AppIntroHeaderProps) => {
  const {width, height} = Dimensions;

  const noOfRows = Math.trunc((height / 2 + 50) / 50);
  const noOfColumns = Math.trunc((width * 2) / 50);

  return (
    <Box style={styles.appIntroHeader}>
      <>
        <View style={styles.appIntroHeaderOuterCircle}>
          <View style={styles.appIntroHeaderInnerCircle}>
            <Image source={image} style={styles.logo} />
          </View>
        </View>

        <RandomBackgroundIcons noOfRows={noOfRows} noOfColumns={noOfColumns} />
      </>
    </Box>
  );
};

const AppIntroContents = ({title, description}: AppIntroContentsProps) => {
  return (
    <View>
      <View style={styles.appIntroContentsEmtpyFill} />
      <View style={styles.appIntroContents}>
        <Text style={styles.appIntroContentsTitle}>{title}</Text>

        <Text style={styles.appIntroContentsParagraph}>{description}</Text>
      </View>
    </View>
  );
};

export const AppIntroSliderItem = ({
  description,
  image,
  title,
}: AppIntroSliderItemProps) => {
  return (
    <>
      <AppIntroHeader image={image} />
      <AppIntroContents title={title} description={description} />
    </>
  );
};

const styles = ScaledSheet.create({
  appIntroHeader: {
    backgroundColor: colors.primary,
    height: '442@vs',
    width: Dimensions.width * 2,
    position: 'absolute',
    top: -verticalScale(40),
    left: -Dimensions.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: Dimensions.width * 2,
    borderBottomLeftRadius: Dimensions.width * 2,
  },
  appIntroHeaderOuterCircle: {
    height: '270@vs',
    width: '270@vs',
    borderRadius: '270@vs',
    borderWidth: '10@s',
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  appIntroHeaderInnerCircle: {
    height: '218@vs',
    width: '218@vs',
    backgroundColor: colors.white,
    borderRadius: '218@vs',
    borderWidth: '10@s',
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 25,
  },
  appIntroContentsEmtpyFill: {
    height: `${(442 - verticalScale(40)).toFixed()}@vs`,
  },
  appIntroContents: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '30@s',
  },
  appIntroContentsTitle: {
    color: colors.primary,
    fontSize: '20@s',
    textAlign: 'center',
    marginTop: '40@vs',
    fontFamily: 'Roboto-Bold',
  },
  appIntroContentsParagraph: {
    marginTop: '5@vs',
    fontSize: '14@s',
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'Roboto-Regular',
  },
  logo: {
    width: '130@s',
    resizeMode: 'contain',
  },
});
