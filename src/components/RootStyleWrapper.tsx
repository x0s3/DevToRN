import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Theme
} from 'react-native-paper';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFF',
    text: '#FFF'
  },
  fonts: {
    regular: {
      fontFamily: 'opensans-bold',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'opensans-semibold',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'opensans-regular',
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: 'opensans-regular',
      fontWeight: 'normal'
    }
  }
};

export const RootStyleWrapper: React.ElementType = ({ children }) => {
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: props => <Icons {...props} />
      }}
    >
      {children}
    </PaperProvider>
  );
};
