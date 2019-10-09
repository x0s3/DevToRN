import { createAction } from 'typesafe-actions';

export const changeTheme = createAction('CHANGE_APP_THEME');

export const changeLang = createAction(
  'CHANGE_APP_LANG',
  action => (lang: string) => action(lang)
);
