import {StackNavigationRoute} from '@core/navigation/models';
import {RootState} from '@core/store';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export const useLoginCheck = navigation => {
  const {isLoggedIn, userData} = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      [userData].forEach(user => {
        switch (user.typeOfUser) {
          case 'admin':
            navigation.navigate(StackNavigationRoute.AdminHome);
            break;
          case 'delieveryPartner':
            navigation.navigate(StackNavigationRoute.DelieveryPartnerHome);
            break;
          case 'user':
            navigation.navigate(StackNavigationRoute.UserHome);
            break;
          default:
            break;
        }
      });
    }
  }, [isLoggedIn]);
};
