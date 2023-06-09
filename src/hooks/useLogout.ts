import {StackNavigationRoute} from '@core/navigation/models';
import {RootState} from '@core/store';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export const useLogoutCheck = navigation => {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{name: StackNavigationRoute.Login}],
      });
    }
  }, [isLoggedIn]);
};
