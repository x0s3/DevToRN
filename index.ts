import { Navigation } from 'react-native-navigation';
import { YellowBox } from 'react-native';
import { initialStack, registerScreens } from './src/navigation';

YellowBox.ignoreWarnings(['Require cycle: node_modules/react-native-paper']);

Navigation.events().registerAppLaunchedListener(() => {
  registerScreens();
  initialStack();
});
