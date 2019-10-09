import { useReduxAction, useReduxState } from '@hooks/use-redux';
import { changeTheme as changeThemeRedux } from '@redux/actions/options.actions';
import { selectedTheme } from '@redux/selectors/options.selectors';
import React, { useMemo } from 'react';
import { Switch } from 'react-native-paper';

type SwitchProps = React.ComponentProps<typeof Switch>;

export const DarkModeButton = React.memo<SwitchProps>(props => {
  const selectedThemeSelector = useReduxState(selectedTheme);
  const isDarkTheme = useMemo<boolean>(() => selectedThemeSelector, [
    selectedThemeSelector
  ]);
  const changeTheme = useReduxAction(changeThemeRedux);

  return <Switch {...props} value={isDarkTheme} onValueChange={changeTheme} />;
});
