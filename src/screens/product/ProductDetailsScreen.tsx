import {Box, Button, Empty, Seperator} from '@components';
import {AppDispatch, RootState} from '@core/store';
import {logout} from '@core/store/reducers/authSlice';
import {deliveryProduct} from '@core/store/reducers/productsSlice';
import {colors} from '@core/theme';
import {useLogoutCheck} from '@hooks';
import {Product} from 'models/Product';
import React from 'react';
import {FlatList, Pressable, SafeAreaView, Text, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

const ColumnNameMap = {
  productName: 'Product Name',
  productType: 'Product Type',
  quantity: 'Quantity',
  address: 'Address',
};

const Item = ({item}: {item}) => {
  const entries = Object.entries(item).filter(
    e => e[0] !== 'isDelievered',
  ) as Array<[string, string]>;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box>
      <>
        <FlatList
          data={entries}
          renderItem={({item, index}: {item; index: number}) => {
            const [key, value]: [string, string] = item;
            const isLastItem = index === entries.length - 1;
            return (
              <View key={key}>
                <View style={styles.itemContainer}>
                  <Text style={styles.key}>{ColumnNameMap[key] ?? ''}</Text>
                  <Text style={styles.value}>{value}</Text>
                </View>
                {!isLastItem && <View style={styles.itemSeparator}></View>}
              </View>
            );
          }}
        />
        <Button
          onClick={() => {
            dispatch(deliveryProduct(item.productName));
          }}
          style={styles.deliverButton}
          title="Delievered"
        />
      </>
    </Box>
  );
};
export const ProductDetailsScreen = ({navigation}) => {
  useLogoutCheck(navigation);
  const products: Product[] = useSelector(
    (state: RootState) => state.product.products,
  );
  const productsArray = [...products].filter(product => {
    return product.isDelievered !== true;
  });
  console.log('object', productsArray);

  const userData = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch<AppDispatch>();

  const AppItemListHeader = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <Text>
            Welcome <Text style={styles.userName}>{userData.username}</Text>
          </Text>
          <Pressable onPress={() => dispatch(logout())}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.primary,
                fontSize: scale(14),
              }}>
              Log Out
            </Text>
          </Pressable>
        </View>
        <Text style={styles.headerTitle}>Products Details</Text>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.homeContainer}>
      <FlatList
        ListHeaderComponent={() => <AppItemListHeader />}
        keyExtractor={(item, index) => index.toString()}
        data={productsArray}
        ListEmptyComponent={() => (
          <Empty textStyle={styles.emptyMessage} message={'No data found'} />
        )}
        ItemSeparatorComponent={() => <Seperator spacing={20} />}
        ListFooterComponent={() => <Seperator spacing={50} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item, index}: {item; index: number}) => (
          <Item item={item} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  homeContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Roboto-Bold',
    color: colors.primary,
    fontSize: '14@s',
    marginVertical: '15@vs',
  },
  userName: {
    color: colors.blackLight,
    fontWeight: 'bold',
    fontSize: '15@s',
    textTransform: 'capitalize',
  },
  productsContainer: {
    backgroundColor: colors.white,
    marginHorizontal: '15@s',
  },
  appListHeader: {
    marginVertical: '20@vs',
  },
  contentContainerStyle: {
    marginHorizontal: '13@s',
    marginVertical: '18@vs',
    paddingHorizontal: '5@s',
  },
  emptyMessage: {
    fontSize: '14@s',
    fontFamily: 'Roboto-Medium',
    color: colors.text,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTitle: {
    fontFamily: 'Roboto-Bold',
    color: colors.primary,
    fontSize: '14@s',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemSeparator: {
    height: 2,
    backgroundColor: colors.greyBorder,
    width: '100%',
    marginVertical: '10@vs',
  },
  key: {
    fontWeight: 'bold',
    fontSize: '12@s',
    color: colors.blackLight,
  },
  value: {
    color: colors.grey,
    fontWeight: 'bold',
  },
  deliverButton: {
    width: '276@s',
    alignSelf: 'center',
    marginTop: '20@vs',
  },
});
