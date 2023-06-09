import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';

import {AppIntroSliderItem, AppIntroSliderItemProps, Button} from '@components';

import {Dimensions} from '@utils';
import {colors} from '@core/theme';

export interface AppIntroPaginatorProps {
  page: number;
  totalPages: number;
}

export type AppIntroSliderProps = {
  screens: AppIntroSliderItemProps[];
  onClickAction: () => void;
};

const {width, height} = Dimensions;

const AppIntroPaginator = ({page, totalPages}: AppIntroPaginatorProps) => {
  return (
    <View style={styles.appIntroPaginationWrapper}>
      {Array.from(Array(totalPages).keys()).map((key, index) => (
        <View
          key={index}
          style={[
            styles.appIntroPaginationDots,
            {
              backgroundColor:
                page === index ? colors.primary : colors.greyLight,
            },
          ]}
        />
      ))}
    </View>
  );
};

export const AppIntroSlider = ({
  screens,
  onClickAction,
}: AppIntroSliderProps) => {
  const [page, setPage] = useState(0);

  const setSliderPage = (event: any) => {
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Number(Math.ceil(x / width).toFixed(0));
    if (indexOfNextScreen !== page) {
      setPage(indexOfNextScreen);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}>
        {screens.map((item, index) => {
          return (
            <View key={index} style={styles.appIntroItem}>
              <AppIntroSliderItem {...item} />
            </View>
          );
        })}
      </ScrollView>

      {screens.length > 1 && (
        <AppIntroPaginator page={page} totalPages={screens.length} />
      )}
      <Button
        title={'Get Started'}
        onClick={onClickAction}
        style={styles.appIntroActionButton}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  appIntroItem: {
    height: height,
    width: width,
    overflow: 'hidden',
  },
  appIntroActionButton: {
    marginHorizontal: '15@s',
    marginBottom: '20@vs',
    width: '274@s',
  },
  appIntroPaginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '15@vs',
  },
  appIntroPaginationDots: {
    height: '10@vs',
    width: '10@vs',
    borderRadius: '10@vs',
    marginLeft: `5@s`,
    marginRight: `5@s`,
  },
});
