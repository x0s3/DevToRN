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

    it('should create cancel published articles action successfully', () => {
      const expectedAction = {
        type: 'PUBLISHED_ARTICLES_CANCEL'
      };

      expect(
        actions.publishedArticlesActions.fetchPublishedArticles.cancel()
      ).toEqual(expectedAction);
    });
  });
});
