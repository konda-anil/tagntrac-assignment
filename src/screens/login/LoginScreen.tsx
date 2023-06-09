import React, {useState} from 'react';
import {Text, View, Pressable, Image, ToastAndroid} from 'react-native';

import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import {
  Button,
  Input,
  Box,
  KeyboardAwareView,
  RandomBackgroundIcons,
  Loader,
} from '@components';

import {colors} from '@core/theme';
import {Dimensions} from '@utils';
import {StackNavigationRoute} from '@core/navigation/models';
import {AppDispatch, RootState} from '@core/store';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '@core/store/reducers/authSlice';
import {useLoginCheck} from '@hooks';

export const LoginScreen = ({navigation}) => {
  const [showPassoword, setShowPassword] = useState<boolean>();
  const {width, height} = Dimensions;

  const noOfRows = Math.trunc((height / 2 + 50) / 50);
  const noOfColumns = Math.trunc((width * 2) / 50);

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const users = useSelector((state: RootState) => state.userData.users);
  const dispatch = useDispatch<AppDispatch>();

  const onLogin = () => {
    setLoading(true);
    const user = users.find(
      user => userName === user.username && password === user.password,
    );

    if (!user) {
      ToastAndroid.show('Incorrect credentials', 1000);
      setLoading(false);
      return;
    }

    if (!user?.isActive) {
      ToastAndroid.show('Your onboarding process is pending', 1000);
      setLoading(false);
      return;
    }

    setLoading(false);
    dispatch(login(user));
  };
  useLoginCheck(navigation);

  return (
    <KeyboardAwareView style={styles.container}>
      <Box style={styles.background}>
        <RandomBackgroundIcons noOfRows={noOfRows} noOfColumns={noOfColumns} />
      </Box>
      <View style={styles.login}>
        <Box>
          <>
            <Text style={styles.header}>Login</Text>
            <Input
              placeholder="User Name"
              icon="user"
              iconType="ant"
              style={styles.input}
              value={userName}
              onChange={setUserName}
            />
            <Input
              placeholder="Password"
              icon={showPassoword ? 'eye-outline' : 'eye-off-outline'}
              iconType="ionicons"
              style={styles.input}
              secureTextEntry={!showPassoword}
              onClickIcon={() => setShowPassword(!showPassoword)}
              value={password}
              onChange={setPassword}
            />

            <View style={styles.forgotPassword}>
              <Pressable>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </Pressable>
            </View>

            <View style={styles.bottomContents}>
              <Button
                title="Login"
                style={styles.loginButton}
                onClick={onLogin}
              />
            </View>

            <View style={styles.signUpContainer}>
              <Text style={styles.noAccount}>Don't have an account?</Text>
              <Pressable
                onPress={() =>
                  navigation.navigate(StackNavigationRoute.SignUp)
                }>
                <Text style={styles.forgot}>Signup</Text>
              </Pressable>
            </View>
          </>
        </Box>
      </View>

      {loading && <Loader />}
    </KeyboardAwareView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  login: {
    flex: 1,
    marginHorizontal: '20@s',
    marginTop: '150@vs',
  },
  header: {
    color: colors.black,
    fontSize: '20@s',
    fontFamily: 'Roboto-Bold',
    textDecorationLine: 'underline',
    marginBottom: '30@vs',
  },
  input: {
    marginVertical: '10@vs',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
  },
  forgot: {
    fontSize: '14@s',
    color: colors.primary,
    fontFamily: 'Roboto-Regular',
  },
  background: {
    backgroundColor: colors.primary,
    height: '400@vs',
    width: Dimensions.width * 2,
    position: 'absolute',
    top: -verticalScale(100),
    left: -Dimensions.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: Dimensions.width * 2,
    borderBottomLeftRadius: Dimensions.width * 2,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20@vs',
    marginTop: '10@vs',
  },
  noAccount: {
    color: colors.blackLight,
    fontFamily: 'Roboto-Regular',
    fontSize: '14@s',
  },
  bottomContents: {
    marginTop: '20@vs',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
  },
  image: {
    marginVertical: '15@vs',
    width: '234@s',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
