import {combineReducers} from 'redux';
import {authReducer} from '@core/store/reducers/authSlice';
import {userReducer} from './userSlice';
import {productReducer} from './productsSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  userData: userReducer,
  product: productReducer,
});
