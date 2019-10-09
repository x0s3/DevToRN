import { RootState } from 'typesafe-actions';

export const selectedTheme = (state: RootState) => state.options.darkTheme;
