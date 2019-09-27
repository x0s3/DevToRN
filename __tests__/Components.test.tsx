import React from 'react';
import 'react-native';
import { render, fireEvent, shallow } from 'react-native-testing-library';
import { Chip, Card } from '../src/components';

describe('FC TESTS', () => {
  it('[CHIP] should mount and change state correctly', () => {
    const testID = 'testChip';
    const { queryByText, getByTestId } = render(
      <Chip text={testID} action={() => undefined} />
    );

    expect(queryByText(testID)).not.toBeNull();

    expect(getByTestId(testID).props.selected).toBeFalsy();

    fireEvent.press(getByTestId(testID));

    expect(getByTestId(testID).props.selected).toBeTruthy();

    fireEvent.press(getByTestId(testID));

    expect(getByTestId(testID).props.selected).toBeFalsy();
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
      const { output } = shallow(<Card {...mockedArticle} testID={0} />);

      const { getByTestId } = render(<Card {...mockedArticle} testID={0} />);

      expect(getByTestId(testID)).not.toBeNull();

      expect((output.type as any).Cover.render()).toBeTruthy();
    });
  });
});
