import React from 'react';
import { Provider, ProviderProps } from 'react-redux';
import { RootStyleWrapper } from '../components/RootStyleWrapper';
import ErrorBoundary from '../components/ErrorBoundary';

const CustomProvider: React.FC<ProviderProps> = ({ store, children }) => (
  <Provider store={store}>
    <ErrorBoundary>
      <RootStyleWrapper>{children}</RootStyleWrapper>
    </ErrorBoundary>
  </Provider>
);

export default CustomProvider;
