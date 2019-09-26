import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import { render } from 'react-native-testing-library';
import App from '../src/App';

test('renders correctly', () => {
  render(<App />);
});
