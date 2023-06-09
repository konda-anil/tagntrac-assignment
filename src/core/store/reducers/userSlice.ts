import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {UserProfile} from 'models/Customer';
import {ToastAndroid} from 'react-native';

export interface UserProfileState {
  userData: UserProfile;
}

const authState: UserProfileState = {
  userData: {
    username: '',
    email: '',
    password: '',
    gender: '',
    mobile: '',
    isActive: false,
    typeOfUser: '',
  },
};

const UserData = {
  users: [
    {
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
      gender: 'M',
      mobile: '1234567891',
      isActive: true,
      typeOfUser: 'admin',
    },
    {
      username: 'user',
      email: 'user@gmail.com',
      password: 'user',
      gender: 'M',
      mobile: '1122331122',
      isActive: true,
      typeOfUser: 'user',
    },
    {
      username: 'anil',
      email: 'user@gmail.com',
      password: 'anil',
      gender: 'M',
      mobile: '1122331122',
      isActive: true,
      typeOfUser: 'delieveryPartner',
    },
  ],
};
const userSlice = createSlice({
  name: 'userData',
  initialState: UserData,
  reducers: {
    approveUser: (state, action: PayloadAction<String>) => {
      const users = [...state.users];
      users.forEach(user => {
        if (user.username === action.payload) {
          user.isActive = true;
        }
        state.users = users;
      });
    },
    addUser: (state, action: PayloadAction<UserProfile>) => {
      const us = [...state.users];
      us.push(action.payload);
      state.users = us;
      ToastAndroid.show(
        'Your account has been created. Admin should approve your request .Please wait until',
        2000,
      );
    },
    deleteUser: (state, action: PayloadAction<UserProfile>) => {
      state.users = state.users.filter(
        user => user.username !== action.payload.username,
      );
    },
  },
});

export const {addUser, approveUser, deleteUser} = userSlice.actions;

export const userReducer = userSlice.reducer;
