import React, { Component } from 'react';
import { Text } from 'react-native';

export default class ErrorBoundary extends Component<
  React.ReactNode,
  { hasError: boolean }
> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Text testID={'errorBoundaryText'}>
          Ups seems like something went wrong... :(
        </Text>
      );
    }

    return this.props.children;
  }
}
