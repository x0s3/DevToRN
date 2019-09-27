import { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';

function useNavigationBottomTabSelect(handler: (e?: any) => void) {
  useEffect(() => {
    const subscription = Navigation.events().registerBottomTabSelectedListener(
      handler
    );

    return () => subscription.remove();
  }, [handler]);
}

export { useNavigationBottomTabSelect };
