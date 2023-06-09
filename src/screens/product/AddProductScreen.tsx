import {Button, Input} from '@components';
import {AppDispatch, RootState} from '@core/store';
import {logout} from '@core/store/reducers/authSlice';
import {addProduct} from '@core/store/reducers/productsSlice';
import {colors} from '@core/theme';
import {useLogoutCheck} from '@hooks';
import {Product} from 'models/Product';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

export const AddProductScreen = ({navigation}) => {
  useLogoutCheck(navigation);
  const [productData, setProductData] = useState<Product>({
    isDelievered: false,
  } as Product);
  const userData = useSelector((state: RootState) => state.auth.userData);

  const dispatch = useDispatch<AppDispatch>();
  const AppItemListHeader = () => {
    return (
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
    );
  };

  const onChangeofInput = (name: string, value: string) => {
    setProductData({...productData, [name]: value});
  };

  const OnAddProduct = () => {
    dispatch(addProduct(productData));
    setProductData({isDelievered: false} as Product);
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <AppItemListHeader />
      <ScrollView>
        <View style={styles.addProductContainer}>
          <Text style={styles.header}>Add Product</Text>
          <Input
            placeholder="Product Name"
            style={styles.input}
            value={productData.productName}
            onChange={(value: string) => onChangeofInput('productName', value)}
          />
          <Input
            placeholder="Product Type"
            style={styles.input}
            value={productData.productType}
            onChange={(value: string) => onChangeofInput('productType', value)}
          />
          <Input
            placeholder="Quantity"
            style={styles.input}
            value={productData.quantity}
            keyboardType={'phone-pad'}
            onChange={(value: string) => onChangeofInput('quantity', value)}
          />
          <Input
            placeholder="Address"
            style={styles.input}
            value={productData.address}
            onChange={(value: string) => onChangeofInput('address', value)}
          />

          <View style={styles.bottomContents}>
            <Button
              title="Add"
              style={styles.addProductButton}
              onClick={OnAddProduct}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  homeContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '20@s',
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
  addProductContainer: {
    backgroundColor: colors.white,
    borderRadius: '10@s',
    marginTop: '10@s',
    padding: '10@s',
    marginHorizontal: '20@s',
  },
  header: {
    color: colors.black,
    fontSize: '20@s',
    fontFamily: 'Roboto-Bold',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginVertical: '10@vs',
  },
  input: {
    marginVertical: '10@vs',
  },
  addProductButton: {
    width: '276@s',
    alignSelf: 'center',
    marginVertical: '15@vs',
  },
  bottomContents: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
