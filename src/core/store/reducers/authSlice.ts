import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {UserProfile} from 'models/Customer';

export interface AuthState {
  isLoggedIn: boolean;
  userData: UserProfile;
}

const authState: AuthState = {
  isLoggedIn: false,
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

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    login: (state, action: PayloadAction<UserProfile>) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.userData = {} as unknown as UserProfile;
    },
  },
});

export const {login, logout} = authSlice.actions;

export const authReducer = authSlice.reducer;
