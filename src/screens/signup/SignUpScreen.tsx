import {Button, Input, Select, SelectOptionProps} from '@components';
import {StackNavigationRoute} from '@core/navigation/models/navigation-routes';
import {AppDispatch, RootState} from '@core/store';
import {addUser} from '@core/store/reducers/userSlice';
import {colors} from '@core/theme';
import {UserProfile} from 'models/Customer';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, Text, ToastAndroid, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {Validators} from '@utils';

export const genderOptions: SelectOptionProps[] = [
  {
    label: 'Male',
    value: 'M',
  },
  {
    label: 'Female',
    value: 'F',
  },
];
export const typesOfUsers: SelectOptionProps[] = [
  {
    label: 'Customer',
    value: 'user',
  },
  {
    label: 'Delievery',
    value: 'delieveryPartner',
  },
];

const formFields = [
  'username',
  'email',
  'mobile',
  'password',
  'gender',
  'typeOfUser',
];

export const SignUpScreen = ({navigation}) => {
  const [showPassoword, setShowPassword] = useState<boolean>();
  const [signUpData, setSignUpData] = useState<UserProfile>({
    isActive: false,
  } as UserProfile);

  const [errors, setErrors] = useState<UserProfile>({} as UserProfile);

  const onChangeofInput = (name: string, value: string) => {
    setSignUpData({...signUpData, [name]: value});
    setErrors({...errors, [name]: Validators[name](value)});
  };

  const users = useSelector((state: RootState) => state.userData.users);
  const dispatch = useDispatch<AppDispatch>();
  const onSignUp = () => {
    let errorMessages = {} as UserProfile;

    formFields.forEach(key => {
      const validator = Validators[key];
      const errorMessage = validator && validator(signUpData[key]);
      if (errorMessage) {
        errorMessages = {...errorMessages, [key]: errorMessage};
      }
    });

    console.log(errorMessages);

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      ToastAndroid.show('Please fill all mandatory fields', 1000);
      return;
    }

    const existingUser = users.findIndex(
      user => user.username === signUpData.username,
    );

    if (existingUser !== -1) {
      ToastAndroid.show('Username already Exists', 1000);
      return;
    }
    dispatch(addUser(signUpData));
    setSignUpData({} as UserProfile);
  };
  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView>
        <View style={styles.signUpContainer}>
          <Text style={styles.header}>SignUp</Text>
          <Input
            placeholder="User Name *"
            icon="user"
            iconType="ant"
            value={signUpData.username}
            errorMessage={errors.username}
            style={styles.input}
            onChange={(value: string) => onChangeofInput('username', value)}
          />
          <Input
            placeholder="Email *"
            icon="email"
            iconType="MaterialIcons"
            value={signUpData.email}
            style={styles.input}
            errorMessage={errors.email}
            onChange={(value: string) => onChangeofInput('email', value)}
          />
          <Input
            placeholder="Mobile No *"
            icon="phone"
            iconType="ant"
            value={signUpData.mobile}
            errorMessage={errors.mobile}
            style={styles.input}
            keyboardType={'phone-pad'}
            onChange={(value: string) => onChangeofInput('mobile', value)}
          />
          <Input
            placeholder="Password *"
            icon={showPassoword ? 'eye-outline' : 'eye-off-outline'}
            iconType="ionicons"
            value={signUpData.password}
            style={styles.input}
            errorMessage={errors.password}
            secureTextEntry={!showPassoword}
            onClickIcon={() => setShowPassword(!showPassoword)}
            onChange={(value: string) => onChangeofInput('password', value)}
          />
          <Select
            placeholder="Gender *"
            style={styles.input}
            selectedOption={signUpData.gender}
            errorMessage={errors.gender}
            onSelect={(value: string) => onChangeofInput('gender', value)}
            options={genderOptions}
          />
          <Select
            placeholder="User Type *"
            style={styles.input}
            errorMessage={errors.typeOfUser}
            selectedOption={signUpData.typeOfUser}
            onSelect={(value: string) => onChangeofInput('typeOfUser', value)}
            options={typesOfUsers}
          />
          <View style={styles.bottomContents}>
            <Button
              title="Sign Up"
              style={styles.signupButton}
              onClick={onSignUp}
            />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.accountExists}>Already have an account?</Text>
            <Pressable
              onPress={() => navigation.navigate(StackNavigationRoute.Login)}>
              <Text style={styles.login}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  signUpContainer: {
    backgroundColor: colors.white,
    borderRadius: '10@s',
    marginTop: '10@s',
    padding: '10@s',
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '20@s',
    marginVertical: '10@vs',
    marginBottom: '20@vs',
  },
  login: {
    fontSize: '14@s',
    color: colors.primary,
    fontFamily: 'Roboto-Regular',
  },
  accountExists: {
    color: colors.blackLight,
    fontFamily: 'Roboto-Regular',
    fontSize: '14@s',
  },
  signupButton: {
    width: '276@s',
    alignSelf: 'center',
    marginTop: '50@vs',
  },
  bottomContents: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
