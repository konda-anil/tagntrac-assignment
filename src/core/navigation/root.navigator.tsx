import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@core/navigation/stack.navigator';


export const RootNavigator = () => {
	return (<NavigationContainer>
    <RootStackNavigator/>
  </NavigationContainer>);
}