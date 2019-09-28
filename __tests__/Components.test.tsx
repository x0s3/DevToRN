import React from 'react';
import 'react-native';
import { Text } from 'react-native-paper';
import { render, fireEvent } from 'react-native-testing-library';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { RootStyleWrapper } from '../src/components/RootStyleWrapper';
import { Chip, Card, CommonError } from '../src/components';

describe('FC TESTS', () => {
  describe('CHIP', () => {
    it('should mount and change state correctly', () => {
      const testID = 'testChip';
      const { getByTestId } = render(
        <Chip text={testID} action={() => undefined} />
      );

      expect(getByTestId(testID)).not.toBeNull();

      expect(getByTestId(testID).props.children).toBe(`#${testID}`);

      expect(getByTestId(testID).props.selected).toBeFalsy();

      fireEvent.press(getByTestId(testID));

      expect(getByTestId(testID).props.selected).toBeTruthy();

      fireEvent.press(getByTestId(testID));

      expect(getByTestId(testID).props.selected).toBeFalsy();
    });
  });

  describe('ERROR BOUNDARY', () => {
    it('should wrap component correctly and dont show error', () => {
      const Child = () => null;
      const { getByTestId } = render(
        <ErrorBoundary>
          <Child />
        </ErrorBoundary>
      );

      expect(() => getByTestId('errorBoundaryText')).toThrow(
        'No instances found'
      );
    });

    it('should wrap component correctly and show error', () => {
      console.log = jest.fn();
      console.error = jest.fn();

      const Child = () => undefined;
      const { getByTestId } = render(
        <ErrorBoundary>
          <Child />
        </ErrorBoundary>
      );

      expect(getByTestId('errorBoundaryText')).not.toBeNull();
      expect(getByTestId('errorBoundaryText').props.children).toBe(
        'Ups seems like something went wrong... :('
      );
    });
  });

  describe('CARD', () => {
    let mockedArticle;

    beforeEach(() => {
      mockedArticle = require('./mockedData').mockedArticles[0];
    });

    it('should mount correctly with a complete article', () => {
      const testID = 'article-0';
      const { queryAllByProps, getByTestId } = render(
        <Card {...mockedArticle} testID={0} />
      );

      expect(getByTestId(testID)).not.toBeNull();

      expect(getByTestId('paperCover')).not.toBeNull();
      expect(queryAllByProps(['source'])).not.toBeNull();
      expect(getByTestId('paperCover').props.source.uri).toEqual(
        mockedArticle.cover_image
      );
    });

    it('should mount correctly without cover_image', () => {
      const testID = 'article-0';
      mockedArticle.cover_image = null;
      const { getByTestId } = render(<Card {...mockedArticle} testID={0} />);

      expect(getByTestId(testID)).not.toBeNull();

      expect(() => getByTestId('paperCover')).toThrow('No instances found');
    });
  });

  describe('COMMON ERROR', () => {
    it('should mount correctly and have retry action and description visible', () => {
      const descriptionText = 'empty description';
      const { getByTestId } = render(
        <CommonError
          retryAction={() => undefined}
          description={descriptionText}
        />
      );

      expect(getByTestId('commonErrorView')).not.toBeNull();

      expect(getByTestId('descriptionError')).not.toBeNull();
      expect(getByTestId('descriptionError').props.children).toBe(
        descriptionText
      );

      expect(getByTestId('retryActionButton')).not.toBeNull();
    });

    it('should mount correctly and not have retry action and description visible', () => {
      const { getByTestId } = render(<CommonError />);

      expect(getByTestId('commonErrorView')).not.toBeNull();

      expect(() => getByTestId('descriptionError')).toThrow(
        'No instances found'
      );
      expect(() => getByTestId('retryActionButton')).toThrow(
        'No instances found'
      );
    });
  });

  describe('ROOT STYLE WRAPPER', () => {
    it('should mount and wrap correctly', () => {
      const Comp = () => <Text testID={'paperWrapper'}>PAPER :)</Text>;
      const { getByTestId } = render(
        <RootStyleWrapper>
          <Comp />
        </RootStyleWrapper>
      );

      expect(getByTestId('paperWrapper').props.children).toBe('PAPER :)');
    });
  });
});
