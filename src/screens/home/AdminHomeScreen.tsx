import {Button, Empty, Seperator} from '@components';
import {AppDispatch, RootState} from '@core/store';
import {logout} from '@core/store/reducers/authSlice';
import {approveUser} from '@core/store/reducers/userSlice';
import {colors} from '@core/theme';
import {useLogoutCheck} from '@hooks';
import React from 'react';
import {FlatList, Pressable, SafeAreaView, Text, View} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

export const AdminHomeScreen = ({navigation}) => {
  useLogoutCheck(navigation);
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
        <Text style={styles.headerTitle}>Users</Text>
      </>
    );
  };

  const genderMap = {
    M: 'Male',
    F: 'Female',
  };
  const renderUsers = ({item}: any) => {
    return (
      <View key={item.username} style={styles.userContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.key}>User Name</Text>
          <Text style={styles.value}>{item.username}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.itemContainer}>
          <Text style={styles.key}>Email</Text>
          <Text style={styles.value}>{item.email}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.itemContainer}>
          <Text style={styles.key}>Gender</Text>
          <Text style={styles.value}>{genderMap[item.gender]}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.itemContainer}>
          <Text style={styles.key}>Mobile</Text>
          <Text style={styles.value}>{item.mobile}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.itemContainer}>
          <Text style={styles.key}>User Type</Text>
          <Text style={styles.value}>{item.typeOfUser}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <Button
          title="Onboard"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginVertical: verticalScale(8),
            padding: scale(10),
          }}
          onClick={() => dispatch(approveUser(item.username))}
        />
      </View>
    );
  };

  const userData = useSelector((state: RootState) => state.auth.userData);
  const users = useSelector((state: RootState) => state.userData.users);
  const filteredUsers = [...users].filter(user => {
    return user.typeOfUser !== 'admin' && user.isActive === false;
  });

  const dispatch = useDispatch<AppDispatch>();
  return (
    <SafeAreaView style={styles.homeContainer}>
      <FlatList
        ListHeaderComponent={() => <AppItemListHeader />}
        keyExtractor={(item, index) => index.toString()}
        data={filteredUsers}
        ListEmptyComponent={() => (
          <Empty textStyle={styles.emptyMessage} message={'No data found'} />
        )}
        ItemSeparatorComponent={() => <Seperator spacing={20} />}
        ListFooterComponent={() => <Seperator spacing={50} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderUsers}
      />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  homeContainer: {
    flex: 1,
  },
  userContainer: {
    backgroundColor: colors.white,
    paddingVertical: '10@s',
    paddingHorizontal: '15@s',
    borderRadius: '10@s',
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
  horizontalLine: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
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
    marginVertical: '8@s',
  },
  value: {
    color: colors.grey,
    fontWeight: 'bold',
    marginVertical: '8@s',
  },
});
