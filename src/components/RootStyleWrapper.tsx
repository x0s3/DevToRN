import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export const RootStyleWrapper: React.ElementType = ({ children }) => {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </PaperProvider>
  );
};
