import React from 'react';
import 'react-native';
import { render } from 'react-native-testing-library';
import {
  filterArticlesBySelectedTags,
  getPublishedArticle,
  hasErrorArticle,
  isFetchingArticle,
  selectedTheme
} from '../src/redux/selectors';
import Article from '../src/screens/Article/Article.container';
import Forum from '../src/screens/Forum/Forum';
import Options from '../src/screens/Options/Options';
import { mockedArticles, mockedFetchedArticle } from './mockedData';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
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

    it('should show scrollview with the article content', () => {
      // @ts-ignore
      getPublishedArticle.mockReturnValue(mockedFetchedArticle);
      // @ts-ignore
      hasErrorArticle.mockReturnValue(false);
      // @ts-ignore
      isFetchingArticle.mockReturnValue(false);

      const { getAllByTestId } = render(
        <Article componentId={'article'} name={'article'} id={1} />
      );

      expect(getAllByTestId('articleRootView')).toBeDefined();
    });
  });

  // TODO fix
  xdescribe('DARK MODE BUTTON', () => {
    it('should mount button and be falsy', async () => {
      // @ts-ignore
      selectedTheme.mockReturnValue(false);

      const { getByTestId } = render(<Options />);

      expect(getByTestId('changeThemeButtonID').props.value).toBeFalsy();
    });

    it('should mount button and be truthy', () => {
      // @ts-ignore
      selectedTheme.mockReturnValue(true);

      const { getByTestId } = render(<Options />);

      expect(getByTestId('changeThemeButtonID').props.value).toBeTruthy();
    });
  });
});
