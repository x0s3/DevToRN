import { changeTheme } from '@redux/actions/options.actions';
import { createReducer, RootAction } from 'typesafe-actions';

enum LANG {
  en = 'en'
}

interface State {
  darkTheme: boolean;
  lang?: LANG;
  customTags?: string[];
}

export const optionsReducer = createReducer<State, RootAction>({
  darkTheme: false
}).handleAction(changeTheme, state => ({
  ...state,
  darkTheme: !state.darkTheme
}));
