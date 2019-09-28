import { useEffect } from 'react';
import { Navigation, Options } from 'react-native-navigation';

export type ScreenActions = 'push' | 'pop' | 'popTo' | 'popToRoot';

export interface NavigationScreenProps {
  componentId: string;
  actionType: ScreenActions;
  name: string;
  passProps?: any;
  options?: Options;
}

function useNavigationBottomTabSelect(handler: (e?: any) => void) {
  useEffect(() => {
    const subscription = Navigation.events().registerBottomTabSelectedListener(
      handler
    );

    return () => subscription.remove();
  }, [handler]);
}

function useNavigationButtonPress(
  handler: (res: any) => void,
  componentId?: string,
  buttonId?: string
) {
  useEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener(
      event => {
        const equalComponentId = event.componentId === componentId;
        const equalButtonId = event.buttonId === buttonId;

        if (equalComponentId && equalButtonId) {
          handler(event);
        } else if (!buttonId && equalComponentId) {
          handler(event);
        } else if (!componentId && equalButtonId) {
          handler(event);
        } else if (!componentId && !buttonId) {
          handler(event);
        }
      }
    );

    return () => subscription.remove();
  }, [handler, componentId, buttonId]);
}

function useNavigationScreen({
  componentId,
  actionType,
  name,
  passProps,
  options
}: NavigationScreenProps) {
  switch (actionType) {
    case 'push':
      Navigation.push(componentId, {
        component: {
          name,
          passProps,
          options
        }
      });
      break;
    case 'pop':
      Navigation.pop(componentId, { ...options });
      break;
    case 'popTo':
      Navigation.popTo(componentId, { ...options });
      break;
    case 'popToRoot':
      Navigation.popToRoot(componentId, { ...options });
      break;
  }
}

export {
  useNavigationBottomTabSelect,
  useNavigationScreen,
  useNavigationButtonPress
};
