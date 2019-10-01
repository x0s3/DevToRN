import {
  fetchPublishedArticle,
  fetchPublishedArticles,
  updateTagList
} from '../src/redux/actions/publishedArticles.actions';
import { configureStore } from '../src/redux/configureStore';
import {
  filterArticlesBySelectedTags,
  getPublishedArticle,
  getSelectedTags,
  hasErrorArticle,
  hasErrorArticles,
  isFetchingArticle,
  isFetchingArticles
} from '../src/redux/selectors';
import { mockedArticles } from './mockedData';

jest.setMock('../secrets', () => ({
  DEV_API_KEY: ''
}));

describe('REDUX SELECTORS', () => {
  describe('PUBLISHED ARTICLES SELECTORS', () => {
    let store;
    beforeEach(() => {
      store = configureStore();
    });

    describe('FORUM SELECTORS', () => {
      it('should have filtered articles by filtering articles with reselector', () => {
        const actual = filterArticlesBySelectedTags.resultFunc(mockedArticles, [
          'history'
        ]);
        const expected = mockedArticles;
        expect(actual).toEqual(expected);
      });

      it('should have return an empty array by filtering articles with reselector', () => {
        const actual = filterArticlesBySelectedTags.resultFunc(mockedArticles, [
          ''
        ]);
        const expected = mockedArticles;
        expect(actual).toEqual(expected);
      });

      it('should have return isFetchingArticles false', () => {
        store.dispatch(fetchPublishedArticles.success([]));
        expect(isFetchingArticles(store.getState())).toBeFalsy();
      });

      it('should have return hasErrorArticles true', () => {
        store.dispatch(fetchPublishedArticles.failure());
        expect(hasErrorArticles(store.getState())).toBeTruthy();
      });

      it('should have return hasErrorArticles false', () => {
        store.dispatch(fetchPublishedArticles.success([]));
        expect(hasErrorArticles(store.getState())).toBeFalsy();
      });

      it('should have return selected tags array', () => {
        store.dispatch(updateTagList('typescript'));
        expect(getSelectedTags(store.getState())).toEqual(['typescript']);
      });
    });

    describe('ARTICLE SELECTORS', () => {
      it('should have success return isFetchingArticle false', () => {
        store.dispatch(fetchPublishedArticle.success({}));
        expect(isFetchingArticle(store.getState())).toBeFalsy();
      });

      it('should have cancel return isFetchingArticle false', () => {
        store.dispatch(fetchPublishedArticle.cancel());
        expect(isFetchingArticle(store.getState())).toBeFalsy();
      });

      it('should have failure return isFetchingArticle false', () => {
        store.dispatch(fetchPublishedArticle.failure());
        expect(isFetchingArticle(store.getState())).toBeFalsy();
      });

      it('should have return published article', () => {
        store.dispatch(fetchPublishedArticle.success(mockedArticles[0]));
        expect(getPublishedArticle(store.getState())).toEqual(
          mockedArticles[0]
        );
      });

      it('should have return hasErrorArticle published article', () => {
        store.dispatch(fetchPublishedArticle.failure());
        expect(hasErrorArticle(store.getState())).toBeTruthy();
      });
    });
  });
});
