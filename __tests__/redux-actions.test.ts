import actions from '../src/redux/actions';
import { mockedArticles } from './mockedData';

describe('REDUX ACTIONS', () => {
  describe('PUBLISHED ARTICLES ACTIONS', () => {
    it('should create request published articles action successfully', () => {
      const expectedAction = {
        type: 'PUBLISHED_ARTICLES_REQUEST'
      };

      expect(
        actions.publishedArticlesActions.fetchPublishedArticles.request()
      ).toEqual(expectedAction);
    });

    it('should create success published articles action successfully', () => {
      const expectedAction = {
        type: 'PUBLISHED_ARTICLES_SUCCESS',
        payload: mockedArticles
      };

      expect(
        actions.publishedArticlesActions.fetchPublishedArticles.success(
          mockedArticles
        )
      ).toEqual(expectedAction);
    });

    it('should create error published articles action successfully', () => {
      const expectedAction = {
        type: 'PUBLISHED_ARTICLES_ERROR'
      };

      expect(
        actions.publishedArticlesActions.fetchPublishedArticles.failure()
      ).toEqual(expectedAction);
    });
  });

  describe('PUBLISHED ARTICLE ACTIONS', () => {
    it('should create request published article action successfully', () => {
      const expectedAction = {
        type: 'PUBLISHED_ARTICLE_REQUEST',
        payload: 1
      };

      expect(
        actions.publishedArticlesActions.fetchPublishedArticle.request(1)
      ).toEqual(expectedAction);
    });

    it('should create success published article action successfully', () => {
      const expectedAction = {
        type: 'PUBLISHED_ARTICLE_SUCCESS',
        payload: mockedArticles[0]
      };

      expect(
        actions.publishedArticlesActions.fetchPublishedArticle.success(
          mockedArticles[0]
        )
      ).toEqual(expectedAction);
    });

    it('should create error published article action successfully', () => {
      const expectedAction = {
        type: 'PUBLISHED_ARTICLE_ERROR'
      };

      expect(
        actions.publishedArticlesActions.fetchPublishedArticle.failure()
      ).toEqual(expectedAction);
    });

    it('should create cancel published article action successfully', () => {
      const expectedAction = {
        type: 'PUBLISHED_ARTICLE_CANCEL'
      };

      expect(
        actions.publishedArticlesActions.fetchPublishedArticle.cancel()
      ).toEqual(expectedAction);
    });
  });
});
