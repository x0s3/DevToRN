import { Navigation } from 'react-native-navigation';
import CustomProvider from '../redux/Provider';
import { configureStore } from '../redux/configureStore';
import {
  ARTICLE_SCREEN,
  PROFILE_SCREEN,
  FORUM_SCREEN,
  OPTIONS_SCREEN
} from './constants';

const store = configureStore();

export function registerScreens(): void {
  Navigation.registerComponentWithRedux(
    FORUM_SCREEN,
    () => require('../screens/Forum/Forum').default,
    CustomProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    ARTICLE_SCREEN,
    () => require('../screens/Article/Article.container').default,
    CustomProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    PROFILE_SCREEN,
    () => require('../App').default,
    CustomProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    OPTIONS_SCREEN,
    () => require('../screens/Options/Options').default,
    CustomProvider,
    store
  );
}
