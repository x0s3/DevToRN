import React from 'react';
import 'react-native';
import { render } from 'react-native-testing-library';
import {
  filterArticlesBySelectedTags,
  isFetchingArticle,
  hasErrorArticle,
  getPublishedArticle
} from '../src/redux/selectors';
import Forum from '../src/screens/Forum/Forum';
import Article from '../src/screens/Article/Article.container';
import { mockedArticles, mockedFetchedArticle } from './mockedData';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue(() => jest.fn()),
  useDispatch: jest.fn().mockReturnValue(() => jest.fn())
}));
jest.mock('../src/redux/selectors');

describe('CONNECTED COMPONENTS TO REDUX', () => {
  describe('FORUM', () => {
    it('forum published articles list from redux selector', () => {
      // @ts-ignore
      filterArticlesBySelectedTags.mockReturnValue(mockedArticles);

      const { getByTestId } = render(<Forum componentId={'forum'} />);

      expect(getByTestId('FLATLIST_PUB_ARTICLES_TEST')).not.toBeNull();
      expect(getByTestId('FLATLIST_PUB_ARTICLES_TEST')).toBeDefined();

      expect(
        getByTestId('FLATLIST_PUB_ARTICLES_TEST').props.renderItem({
          item: mockedArticles[0],
          index: 0
        })
      ).toBeDefined();
    });

    it('forum published articles list from redux selector', () => {
      // @ts-ignore
      filterArticlesBySelectedTags.mockReturnValue(mockedArticles);

      const { getByTestId } = render(<Forum componentId={'forum'} />);

      expect(getByTestId('FLATLIST_PUB_ARTICLES_TEST')).not.toBeNull();

      expect(
        getByTestId('FLATLIST_PUB_ARTICLES_TEST').props.renderItem({
          item: mockedArticles[0],
          index: 0
        })
      ).toBeDefined();
    });
  });

  describe('ARTICLE', () => {
    it('should show common error view', () => {
      // @ts-ignore
      hasErrorArticle.mockReturnValue(true);

      const { getByText, getByTestId } = render(
        <Article componentId={'article'} name={'article'} id={1} />
      );

      expect(getByText('Ups seems like we have an error')).toBeDefined();
      expect(getByTestId('retryActionButton')).toBeDefined();
      expect(() => getByTestId('descriptionError')).toThrow(
        'No instances found'
      );
    });

    it('should show is fetching an article', () => {
      // @ts-ignore
      hasErrorArticle.mockReturnValue(false);
      // @ts-ignore
      isFetchingArticle.mockReturnValue(true);
      // @ts-ignore
      getPublishedArticle.mockReturnValue({});

      const { getByText } = render(
        <Article componentId={'article'} name={'article'} id={1} />
      );

      expect(getByText('Im fetching an article :)')).toBeDefined();
    });

    xit('should show scrollview with the article content', () => {
      // @ts-ignore
      getPublishedArticle.mockReturnValue(mockedFetchedArticle);
      // @ts-ignore
      hasErrorArticle.mockReturnValue(false);
      // @ts-ignore
      isFetchingArticle.mockReturnValue(false);

      const { debug } = render(
        <Article componentId={'article'} name={'article'} id={1} />
      );

      debug('componente');
    });
  });
});
